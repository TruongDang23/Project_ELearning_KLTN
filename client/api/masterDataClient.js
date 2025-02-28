import axios from 'axios'
import { ApiClient } from './apiClient'

export class MasterDataClient extends ApiClient {
  constructor() {
    super("masterdata")
  }

  async create(object, name) {
    try {
      const response = await axios.post(`${this.domain}`,
        {
          data: {
            object,
            name
          }
        })
      return response
    }
    catch (error) {
      return error
    }
  }

  async delete(object, name) {
    try {
      const response = await axios.delete(`${this.domain}`,
        {
          data: {
            object,
            name
          }
        })
      return response
    }
    catch (error) {
      return error
    }
  }
}