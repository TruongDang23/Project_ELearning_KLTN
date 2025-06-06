import axios from 'axios'
import { ApiClient } from './apiClient'
import { CourseClient } from './courseClient'
import { ModelClient } from './modelClient'
import { NotifyClient } from './notifyClient'
import { VoucherClient } from './voucherClient'

export class StudentClient extends ApiClient {
  constructor() {
    super("student")
    this.course = new CourseClient()
    this.model = new ModelClient()
    this.notify = new NotifyClient()
    this.voucher = new VoucherClient()
  }

  async changePassword(id, oldPassword, newPassword) {
    try {
      const response = await axios.post(`${this.domain}/change-password/${id}`, {
        oldPassword,
        newPassword
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async updateAvatar(id, formData) {
    try {
      const response = await axios.put(`${this.domain}/avatar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async updateProgress(courseID, lectureID, percent) {
    try {
      const response = await axios.post(`${this.domain}/${courseID}/${lectureID}/updateprogress`, {
        headers: {
          //authentication
        },
        data: percent
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async QnA(courseID, lectureID, content, url) {
    try {
      const response = await axios.post(`${this.domain}/${courseID}/${lectureID}/QA`, { data: content, url: url })
      return response
    }
    catch (error) {
      return error
    }
  }

  async getQnA(courseID, lectureID) {
    return this.course.getLectureQnA(courseID, lectureID)
  }

  async ratingsCourse(courseID, content) {
    try {
      const response = await axios.post(`${this.domain}/${courseID}/ratings`, {
        data: content
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async buyCourse(courseID) {
    try {
      const response = await axios.post(`${this.domain}/buy/${courseID}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async payment(courseID, cancel_url, return_url, voucher_code) {
    try {
      const response = await axios.post(`${this.domain}/pay/${courseID}`,
        {
          voucher_code,
          cancel_url,
          return_url
        })
      return response
    }
    catch (error) {
      return error
    }
  }

  async getCourseSummary(id) {
    return await this.course.loadSumaryInformation(id)
  }

  async getCourseDetails(id) {
    return await this.course.getInformation(id)
  }

  async loadListCourse() {
    return await this.course.getListInformation()
  }

  async searchCourse(params) {
    return await this.course.searchCourse(params)
  }

  async chatBot(content) {
    return await this.model.chatBot(content)
  }

  async chatAI(content, sessionID) {
    return await this.model.chatAI(content, sessionID)
  }

  async getListNotification(id) {
    return await this.notify.getInformation(id)
  }

  async updateUnreadNotify(id, notifyID) {
    return await this.notify.updateUnreadNotify(id, notifyID)
  }

  async submitAssignment(courseID, language, sourceCode, testcases) {
    return await this.course.submitAssignment(courseID, language, sourceCode, testcases)
  }

  async getMatchedVouchers(courseID) {
    return await this.voucher.getMatchedVouchers(courseID)
  }
}