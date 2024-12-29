import nodemailer from 'nodemailer'
import { htmlToText } from 'html-to-text'

class Email {
  constructor(user, url) {
    this.to = user.Email
    this.firstName = user.HoTen.split(' ')[0]
    this.url = url
    this.from = `Quản lý sự kiện - System <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  generateHtml(subject, newPassword) {
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
            <a href="http://localhost:5173/login" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color:#212121; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Đăng nhập ngay
            </a>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">Trân trọng,<br>Quản lý sự kiện - System</p>
          </div>
        </div>
      </div>
    `
  }

  async send(subject, newPassword) {
    const html = this.generateHtml(subject, newPassword)
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html) // sử dụng htmlToText thay vì fromString
    }

    await this.newTransport().sendMail(mailOptions)
  }

  async sendNewPassword(newPassword) {
    await this.send('Mật khẩu mới của bạn', newPassword)
  }
}

export default Email
