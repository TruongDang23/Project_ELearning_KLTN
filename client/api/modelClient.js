import axios from 'axios'
import { ApiClient } from './apiClient'

export class ModelClient extends ApiClient {
  constructor() {
    super("model")
  }
  async chatAI(content, sessionID) {
    try {
      const response = await axios.post(`${this.domain}/chatAI/${sessionID}`, {
        chatInput: content
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async extractText(url) {
    try {
      const response = await axios.post(`${this.domain}/extractPDF`, {
        url: url
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async recommendCourse() {
    try {
      const response = await axios.get(`${this.domain}/recommend-course`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async getSummaryLecture(url) {
    try {
      const response = await axios.post(`${this.domain}/summary-lecture`, {
        url: url
      })
      return response
    }
    catch (error) {
      return error
    }
  }
}