import axios from 'axios'
import { ApiClient } from './apiClient'

export class CourseClient extends ApiClient {
  constructor() {
    super("course")
  }

  async loadSumaryInformation(id) {
    try {
      const response = await axios.get(`${this.domain}/${id}/summary`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async searchCourse(params) {
    try {
      const response = await axios.get(`${this.domain}`, {
        params: params 
      })
      return response
    }
    catch (error) {
      return error
    }
  }
  
  async createDataCourse(content) {
    try {
      const response = await axios.post(`${this.domain}`, {
        headers: {
          //authorization
        },
        data: content
      })
      return response
    }
    catch (error) {
      return error
    }
  }
}