import axios from 'axios'
import { socket } from './socketClient'

axios.defaults.withCredentials = true

export class ApiClient {
  domain = import.meta.env.VITE_API_URL

  constructor(role) {
    this.domain = `${this.domain}/${role}`
  }

  getDomain() {
    return this.domain
  }

  async refreshToken() {
    try {
      const response = await axios.get(`${this.domain}/refreshtoken`)
      return response
    }
    catch (error) {
      return error
    }
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
      const response = await axios.get(`${this.domain}/${id}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async getListInformation() {
    try {
      const response = await axios.get(`${this.domain}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async joinIndividualGroup(id) {
    socket.emit('joinIndividual', id)
  }

  async joinCourseGroup(id, role) {
    socket.emit('joinListRooms', id, role)
  }
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi 401 (Unauthorized)
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        // Gọi endpoint để refresh token
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/refreshtoken`)
        // Thêm access_token mới vào header của request ban đầu
        if (res) return axios(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
