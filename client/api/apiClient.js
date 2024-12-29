import axios from 'axios'

export class ApiClient {
  domain = 'http://localhost:5173'
  constructor(role) {
    this.domain = `${this.domain}/${role}`
  }

  getDomain() {
    return this.domain
  }

  async update(id, newdata) {
    try {
      const response = await axios.put(`${this.domain}/${id}`, {
        headers: {
          //authentication
        },
        data: newdata
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async getInformation(id) {
    try {
      const response = await axios.get(`${this.domain}/${id}`, {
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

  async getListInformation() {
    try {
      const response = await axios.get(`${this.domain}`, {
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