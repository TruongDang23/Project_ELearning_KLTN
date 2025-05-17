import axios from 'axios'
import { ApiClient } from './apiClient'
import { CourseClient } from './courseClient'
import { ModelClient } from './modelClient'
import { InstructorClient } from './instructorClient'
import { StudentClient } from './studentClient'
import { MasterDataClient } from './masterDataClient'
import { DashboardClient } from './dashboardClient'
import { VoucherClient } from './voucherClient'

export class AdminClient extends ApiClient {
  constructor() {
    super('admin')
    this.course = new CourseClient()
    this.model = new ModelClient()
    this.instructor = new InstructorClient()
    this.student = new StudentClient()
    this.master = new MasterDataClient()
    this.dashboard = new DashboardClient()
    this.voucher = new VoucherClient()
  }

  async updateAvatar(id, formData) {
    try {
      const response = await axios.put(
        `${this.domain}/avatar/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    } catch (error) {
      return error
    }
  }

  async acceptCourse(id) {
    try {
      const response = await axios.put(`${this.domain}/accept/${id}`)
      return response
    } catch (error) {
      return error
    }
  }

  async republishCourse(id) {
    try {
      const response = await axios.put(`${this.domain}/republish/${id}`)
      return response
    } catch (error) {
      return error
    }
  }

  async rejectCourse(id) {
    try {
      const response = await axios.put(`${this.domain}/reject/${id}`)
      return response
    } catch (error) {
      return error
    }
  }

  async terminateCourse(id, dateRange) {
    try {
      const response = await axios.put(`${this.domain}/terminate/${id}`, {
        time: dateRange
      })
      return response
    } catch (error) {
      return error
    }
  }

  async getQnA(courseID, lectureID) {
    return this.course.getLectureQnA(courseID, lectureID)
  }

  async QnA(courseID, lectureID, content, url) {
    try {
      const response = await axios.post(
        `${this.domain}/${courseID}/${lectureID}/QA`,
        { data: content, url: url }
      )
      return response
    } catch (error) {
      return error
    }
  }

  async lockAccount(id) {
    try {
      const response = await axios.put(`${this.domain}/locked/${id}`, {
        headers: {
          //authentication
        }
      })
      return response
    } catch (error) {
      return error
    }
  }

  async unLockAccount(id) {
    try {
      const response = await axios.put(`${this.domain}/unlocked/${id}`, {
        headers: {
          //authentication
        }
      })
      return response
    } catch (error) {
      return error
    }
  }

  async loadMasterdata() {
    //object: languages, categories, levels
    try {
      const response = await this.master.getListInformation()
      return response
    } catch (error) {
      return error
    }
  }

  async loadDataDashboard() {
    try {
      const response = await this.dashboard.getListInformation()
      return response
    } catch (error) {
      return error
    }
  }

  async getCourseStatistics() {
    try {
      const response = await this.dashboard.getCourseStatistics()
      return response
    } catch (error) {
      return error
    }
  }

  async getUserStatistics() {
    try {
      const response = await this.dashboard.getUserStatistics()
      return response
    } catch (error) {
      return error
    }
  }

  async getCourseByCategory() {
    try {
      const response = await this.dashboard.getCourseByCategory()
      return response
    } catch (error) {
      return error
    }
  }

  async getRatingStatistics() {
    try {
      const response = await this.dashboard.getRatingStatistics()
      return response
    } catch (error) {
      return error
    }
  }

  async addMasterData(object, name) {
    return await this.master.create(object, name)
  }

  async deleteMasterData(object, name) {
    return await this.master.delete(object, name)
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

  async loadListInstructor() {
    return await this.instructor.getListInformation()
  }

  async loadListStudent() {
    return await this.student.getListInformation()
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

  async createVoucher(voucherData) {
    return await this.voucher.create(voucherData)
  }

  async updateVoucher(voucherCode, voucherData) {
    return await this.voucher.update(voucherCode, voucherData)
  }

  async deleteVoucher(voucherCode) {
    return await this.voucher.delete(voucherCode)
  }

  async getVoucherInformation(voucherCode) {
    return await this.voucher.getInformation(voucherCode)
  }

  async getListVoucher() {
    return await this.voucher.getListInformation()
  }

  async getRevenueSummary() {
    return await this.dashboard.getRevenueSummary()
  }

  async getRevenueStatisticsPayment(startDate, endDate) {
    return await this.dashboard.getRevenueStatisticsPayment(startDate, endDate)
  }

  async getTransactions() {
    return await this.dashboard.getTransactions()
  }

  async getListEmbeddedCourse() {
    return await this.dashboard.getListEmbeddedCourse()
  }

  async embedded() {
    try {
      const response = await axios.post(`${this.domain}/embedded-course`)
      return response
    } catch (error) {
      return error
    }
  }

  async addFileEmbedded(formData) {
    try {
      const response = await axios.post(
        `${this.domain}/upload-course-knowledge`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return response
    } catch (error) {
      return error
    }
  }
}
