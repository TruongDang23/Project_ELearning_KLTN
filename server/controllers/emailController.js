/* eslint-disable no-undef */
import nodemailer from 'nodemailer'
import { htmlToText } from 'html-to-text'

class Email {
  constructor() {
    this.username = process.env.EMAIL_USERNAME,
    this.password = process.env.EMAIL_PASSWORD
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.username,
        pass: this.password
      }
    })
  }
  //Email thông báo đến các admin rằng có khóa học mới đang chờ được xét duyệt
  async sendCreateCourse(cousreID, courseName, list_receivers) {
    const url = `${process.env.WEB_DOMAIN}/admin/manageCourse`
    const html = this.#generateHtmlCreateNewCourse(cousreID, courseName, url)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: list_receivers,
      subject: `[ REMIND ] TO APPROVE COURSE: ${cousreID} - ${courseName}`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  //Email thông báo đến giảng viên của khóa học rằng khóa học đã được publish
  async publishCourse(cousreID, courseName, receiver) {
    const url = `${process.env.WEB_DOMAIN}/instructor/manageCourse`
    const html = this.#generateHtmlCourseApproved(cousreID, courseName, url)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver,
      subject: `[SUCCESS] Your course "${cousreID} - ${courseName}" is now live!`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  //Email thông báo đến giảng viên của khóa học rằng khóa học đã bị reject
  async rejectCourse(courseID, courseName, receiver, reason) {
    const url = `${process.env.WEB_DOMAIN}/instructor/manageCourse`
    const html = this.#generateHtmlCourseRejected(courseID, courseName, url, reason)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver,
      subject: `[REVIEW NEEDED] Updates required for your course "${courseID} - ${courseName}"`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  //Email thông báo đến giảng viên của khóa học rằng khóa học đã bị terminated
  async terminatedCourse(courseID, courseName, receiver, reason) {
    const url = `${process.env.WEB_DOMAIN}/instructor/manageCourse`
    const html = this.#generateHtmlCourseTerminated(courseID, courseName, url, reason)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver,
      subject: `[TERMINATED] "${courseID} - ${courseName}" has been unpublished`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  //Email thông báo đến người dùng password mới
  async sendForgetPass(subject, username, receiver, newPassword) {
    const url = `${process.env.WEB_DOMAIN}/login`
    const html = this.#generateHtmlForgotPass(subject, username, newPassword, url)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver,
      subject,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  //Email thông báo đến học viên rằng đã mua khóa học thành công
  async sendBuyCourseSuccess(courseID, receiver) {
    //receiver is an object: {
    //                          fullname: 'abc',
    //                          mail: 'abc@gmail.com'
    //                       }
    const url = `${process.env.WEB_DOMAIN}/student/my-learning#`
    const html = this.#generateHtmlBuyCourseSuccess(receiver.fullname, courseID, url)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver.mail,
      subject: `Congratulations! You've Successfully Enrolled in ${courseID} 🚀`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  //Email thông báo đến giảng viên của khóa học rằng đã có học viên tham gia khóa học của bạn
  async sendCourseIsBuy(courseID, receiver) {
    //receiver is an object: {
    //                          fullname: 'abc',
    //                          mail: 'abc@gmail.com'
    //                       }
    const url = `${process.env.WEB_DOMAIN}/instructor/manageCourse`
    const html = this.#generateHtmlCourseIsBuy(receiver.fullname, courseID, url)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver.mail,
      subject: `Your Course ${courseID} is Growing! A New Student Has Signed Up`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  #generateHtmlForgotPass(subject, username, newPassword, url) {
    return `
      <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
          <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #212121;">${subject}</h2>
            <hr style="border: 1px solid #212121; width: 80%; margin: 20px auto;">
            <p style="font-size: 16px;">Dear <strong>${username}</strong>,</p>
            <p style="font-size: 16px;">Your new password is:</p>
            <div style="background-color: #c5f6fa; padding: 10px 20px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #212121; display: inline-block;">
              ${newPassword}
            </div>
            <p style="font-size: 16px; margin-top: 20px;">Please log in using the new password and change it as soon as possible for security.</p>
            <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #187BCE; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Log In Now
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">Thank you,<br>E-Learning System</p>
          </div>
        </div>
      </div>
    `
  }

  #generateHtmlCreateNewCourse(cousreID, courseName, url) {
    return `
      <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
          <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #212121;">Course Approval Required</h2>
            <hr style="border: 1px solid #212121; width: 80%; margin: 20px auto;">
            <p style="font-size: 16px;">Dear <strong>Admin</strong>,</p>
            <p style="font-size: 16px;">The course <strong>${courseName} (${cousreID})</strong> has been created and is pending approval.</p>
            <p style="font-size: 16px;">Please review and approve the course at your earliest convenience.</p>
            <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:#187BCE; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Approve Course
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">Thank you,<br> E-Learning System</p>
          </div>
        </div>
      </div>
    `
  }

  #generateHtmlBuyCourseSuccess(userName, courseID, url) {
    return `
      <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
          <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #187BCE;">🎉 Course Purchase Successful! 🎉</h2>
            <hr style="border: 1px solid #187BCE; width: 80%; margin: 20px auto;">
            <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
            <p style="font-size: 16px;">You have successfully purchased the course <strong>${courseID}</strong>!</p>
            <p style="font-size: 16px; margin-top: 20px;">Start learning now and enhance your skills.</p>
            <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:#187BCE; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Start Learning Now
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              Thank you for choosing us!<br>
              EL Space
            </p>
          </div>
        </div>
      </div>
    `
  }

  #generateHtmlCourseIsBuy(userName, courseID, url) {
    return `
      <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
          <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #187BCE;">🎉 A New Student Has Enrolled! 🎉</h2>
            <hr style="border: 1px solid #187BCE; width: 80%; margin: 20px auto;">
            <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
            <p style="font-size: 16px;">Great news! A new student has just enrolled in your course <strong>${courseID}</strong>.</p>
            <div style="background-color: #c5f6fa; padding: 10px 20px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #187BCE; display: inline-block;">
              Course ID: ${courseID}
            </div>
            <p style="font-size: 16px; margin-top: 20px;">Visit your instructor dashboard to check details.</p>
            <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:#187BCE; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Go to Dashboard
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              Thank you for being a part of EL Space!<br>
            </p>
          </div>
        </div>
      </div>
    `
  }

  #generateHtmlCourseApproved(courseID, courseName, url) {
    return `
    <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
        <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #212121;">🎉 Your Course Is Now Live!</h2>
          <hr style="border: 1px solid #212121; width: 80%; margin: 20px auto;">
          <p style="font-size: 16px;">Dear <strong>Instructor</strong>,</p>
          <p style="font-size: 16px;">We’re excited to inform you that your course <strong>${courseName} (${courseID})</strong> has been successfully approved and is now live on our platform.</p>
          <p style="font-size: 16px;">You can view your course and share it with learners using the link below:</p>
          <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
            View Published Course
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #999;">Thank you for contributing to the E-Learning community!<br>— E-Learning System Team</p>
        </div>
      </div>
    </div>
  `
  }

  #generateHtmlCourseRejected(courseID, courseName, url, reason) {
    return ` <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
        <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #C0392B;">⚠️ Course Approval Unsuccessful</h2>
          <hr style="border: 1px solid #C0392B; width: 80%; margin: 20px auto;">
          <p style="font-size: 16px;">Dear <strong>Instructor</strong>,</p>
          <p style="font-size: 16px;">We appreciate your effort in creating the course <strong>${courseName} (${courseID})</strong>.</p>
          <p style="font-size: 16px;">However, after a careful review, we regret to inform you that the course has not been approved at this time.</p>
          <p style="font-size: 16px;">Reason for rejection:</p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #C0392B; font-style: italic; color: #555;">
            ${reason}
          </blockquote>
          <p style="font-size: 16px;">You can revise your course and resubmit it for review by visiting the link below:</p>
          <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #E67E22; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Update and Resubmit
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #999;">Thank you for your understanding,<br>— E-Learning System Team</p>
        </div>
      </div>
    </div>
    `
  }

  #generateHtmlCourseTerminated(courseID, courseName, url, reason) {
    return `
      <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
        <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #D35400;">⚠️ Course Termination Notice</h2>
          <hr style="border: 1px solid #D35400; width: 80%; margin: 20px auto;">
          <p style="font-size: 16px;">Dear <strong>Instructor</strong>,</p>
          <p style="font-size: 16px;">We regret to inform you that your course <strong>${courseName} (${courseID})</strong> has been removed from our platform.</p>
          <p style="font-size: 16px;">Reason for termination:</p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #D35400; font-style: italic; color: #555;">
            ${reason}
          </blockquote>
          <p style="font-size: 16px;">If you believe this was a mistake or would like to update your course to meet the platform’s standards, you can review and resubmit it below:</p>
          <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #E67E22; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Review Course
          </a>
          <p style="margin-top: 30px; font-size: 14px; color: #999;">We appreciate your understanding and continued contributions.<br>— E-Learning System Team</p>
        </div>
      </div>
    </div>
    `
  }
}

export default Email