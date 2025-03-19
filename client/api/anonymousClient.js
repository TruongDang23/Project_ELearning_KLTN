import axios from 'axios'
import { ApiClient } from './apiClient'
import { CourseClient } from './courseClient'
import { ModelClient } from './modelClient'

export class AnonymousClient extends ApiClient {
  constructor() {
    super("")
    this.course = new CourseClient()
    this.model = new ModelClient()
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

  async logOut() {
    try {
      const data = await axios.post(`${this.domain}logout`)
      return data
    }
    catch (error) {
      return error
    }
  }

  async getToken() {
    try {
      const data = await axios.get(`${this.domain}get-token`)
      return data
    }
    catch (error) {
      return error
    }
  }

  async getCourseSummary(id) {
    return await this.course.loadSumaryInformation(id)
  }

  async loadListCourse() {
    return await this.course.getListInformation()
  }

  async searchCourse(params) {
    return await this.course.searchCourse(params)
  }

  async chatBot(content) {
    return await this.model.chatBot(content)
  }
}