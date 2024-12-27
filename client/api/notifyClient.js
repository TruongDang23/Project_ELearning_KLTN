import axios from 'axios'
import { ApiClient } from './apiClient'

export class NotifyClient extends ApiClient {
  constructor() {
    super("notification")
  }
  async updateUnreadNotify(id, notifyID) {
    try {
      const response = await axios.put(`${this.domain}/${id}/${notifyID}`, {
        headers: {
          //authentication
        }
      })
      return response
    }
    catch (error) {
      return error
    }
  }
}