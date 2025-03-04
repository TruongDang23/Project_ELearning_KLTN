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

  async sendCreateCourse(cousreID, courseName, list_receivers) {
    const html = this.#generateHtmlCreateNewCourse(cousreID, courseName)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: list_receivers,
      subject: `[ REMIND ] TO APPROVE COURSE: ${courseName}`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  async sendForgetPass(subject, receiver, newPassword) {
    const html = this.#generateHtmlForgotPass(subject, newPassword, "http://localhost:5173/login")
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver,
      subject,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  async sendBuyCourseSuccess(courseID, receiver, url) {
    //receiver is an object: {
    //                          fullname: 'abc',
    //                          mail: 'abc@gmail.com'
    //                       }

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

  async sendCourseIsBuy(courseID, receiver) {
    //receiver is an object: {
    //                          fullname: 'abc',
    //                          mail: 'abc@gmail.com'
    //                       }

    const html = this.#generateHtmlCourseIsBuy(receiver.fullname, courseID)
    const mailOptions = {
      from: `EL Space <${process.env.EMAIL_USERNAME}>`,
      to: receiver.mail,
      subject: `Your Course ${courseID} is Growing! A New Student Has Signed Up`,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  #generateHtmlForgotPass(subject, newPassword, url) {
    return `
      <div style="background: linear-gradient(to right, #212121, ##3a3a3a); padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
          <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #212121;">${subject}</h2>
            <hr style="border: 1px solid #212121; width: 80%; margin: 20px auto;">
            <p style="font-size: 16px;">Chào <strong>${this.firstName}</strong>,</p>
            <p style="font-size: 16px;">Mật khẩu mới của bạn là:</p>
            <div style="background-color: #c5f6fa; padding: 10px 20px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #212121; display: inline-block;">
              ${newPassword}
            </div>
            <p style="font-size: 16px; margin-top: 20px;">Vui lòng đăng nhập ngay lập tức để đảm bảo tính bảo mật.</p>
            <a href="${url}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:#212121; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Đăng nhập ngay
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">Trân trọng,<br>Quản lý sự kiện - System</p>
          </div>
        </div>
      </div>
    `
  }

  #generateHtmlCreateNewCourse(cousreID, courseName) {
    return `
      <div style="background: linear-gradient(to right, #212121, #3a3a3a); padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);">
          <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #212121;">Course Approval Required</h2>
            <hr style="border: 1px solid #212121; width: 80%; margin: 20px auto;">
            <p style="font-size: 16px;">Dear <strong>Admin</strong>,</p>
            <p style="font-size: 16px;">The course <strong>${courseName} (${cousreID})</strong> has been created and is pending approval.</p>
            <p style="font-size: 16px;">Please review and approve the course at your earliest convenience.</p>
            <a style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:#187BCE; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
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
}

export default Email