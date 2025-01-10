import axios from 'axios'
axios.defaults.withCredentials = true

export class ApiClient {
  domain = 'http://localhost:3000/api'

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
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi 401 (Unauthorized)
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        // Gọi endpoint để refresh token
        const res = await axios.post('http://localhost:3000/api/refreshtoken')
        // Thêm access_token mới vào header của request ban đầu
        if (res) return axios(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
