import axios from 'axios'

class ApiClient {
  domain = 'http://localhost:5173'
  constructor(role) {
    this.domain = `${this.domain}/${role}`
  }

  getDomain() {
    return this.domain
  }

  async authenticate(account) {
    try {
      const data = await axios.post(`${this.domain}login`, { //when create entity anonymous then domain is http://localhost:5173/
        username: account.username,
        pass: account.pass,
        role: account.role
      })
      return data
    }
    catch (error) {
      return error
    }
  }

  async authenticateGoogle(credential) {
    try {
      const response = await axios.post(`${this.domain}loginWithGoogle`, {
        loginCredential: credential
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async signUp(info) {
    try {
      const data = await axios.post(`${this.domain}signup`, {
        username: info.username,
        pass: info.pass,
        role: info.role
      })
      return data
    }
    catch (error) {
      return error
    }
  }

  async update(id, newdata) {
    try {
      const response = await axios.patch(`${this.domain}/${id}`, {
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