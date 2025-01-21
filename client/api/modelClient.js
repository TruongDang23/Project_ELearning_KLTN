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
  async chatBot(content) {
    try {
      const response = await axios.post(`${this.domain}/chatBot`, {
        data: {
          context: content
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }
}