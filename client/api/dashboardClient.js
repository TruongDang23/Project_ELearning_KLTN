import axios from 'axios'
import { ApiClient } from './apiClient'

export class DashboardClient extends ApiClient {
  constructor() {
    super('dashboard')
  }

  async getCourseStatistics(object, name) {
    try {
      const response = await axios.get(`${this.domain}/statistic-course`, {
        params: {
          object,
          name
        }
      })
      return response
    } catch (error) {
      return error
    }
  }

  async getUserStatistics(object, name) {
    try {
      const response = await axios.get(`${this.domain}/statistic-user`, {
        params: {
          object,
          name
        }
      })
      return response
    } catch (error) {
      return error
    }
  }
  async getCourseByCategory(object, name) {
    try {
      const response = await axios.get(`${this.domain}/statistic-category`, {
        params: {
          object,
          name
        }
      })
      return response
    } catch (error) {
      return error
    }
  }

  async getRatingStatistics(object, name) {
    try {
      const response = await axios.get(`${this.domain}/statistic-review`, {
        params: {
          object,
          name
        }
      })
      return response
    } catch (error) {
      return error
    }
  }

  async getListEmbeddedCourse() {
    try {
      const response = await axios.get(`${this.domain}//list-embedded-course`)
      return response
    } catch (error) {
      return error
    }
  }

  async getRevenueSummary() {
    try {
      const response = await axios.get(`${this.domain}/summary-payment`)
      return response
    } catch (error) {
      return error
    }
  }

  async getRevenueStatisticsPayment(startDate, endDate) {
    try {
      const response = await axios.get(`${this.domain}/statistic-payment`, {
        params: {
          startDate,
          endDate
        }
      })
      return response
    } catch (error) {
      return error
    }
  }

  async getTransactions() {
    try {
      const response = await axios.get(`${this.domain}/list-payment`)
      return response
    } catch (error) {
      return error
    }
  }
}
