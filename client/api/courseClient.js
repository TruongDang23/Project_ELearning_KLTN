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
      const response = await axios.get(`${this.domain}/search`, {
        params: params
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async uploadFileMedia(formData) {
    try {
      const response = await axios.put(`${this.domain}/attach`, formData, {
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

  async getLectureQnA(courseID, lectureID) {
    try {
      const response = await axios.get(`${this.domain}/${courseID}/${lectureID}/QA`)
      return response
    }
    catch (error) {
      return error
    }
  }
}