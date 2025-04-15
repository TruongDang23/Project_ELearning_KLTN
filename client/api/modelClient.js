import axios from 'axios'
import { ApiClient } from './apiClient'

export class ModelClient extends ApiClient {
  domainN8N = import.meta.env.VITE_DOMAIN_N8N
  constructor() {
    super("model")
  }
  async chatAI(content) {
    try {
      const response = await axios.post(`${this.domain}/chatAI`, {
        context: content
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
      const response = await axios.post(`${this.domainN8N}/webhook/summary-lecture`, {
        url: url
      })
      return response
    }
    catch (error) {
      return error
    }
  }
}