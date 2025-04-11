import axios from 'axios'
import { ApiClient } from './apiClient'

export class ModelClient extends ApiClient {
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
}