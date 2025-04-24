import axios from 'axios'
import { ApiClient } from './apiClient'


export class VoucherClient extends ApiClient {
  constructor() {
    super('voucher')
  }

  async create(data) {
    try {
      const response = await axios.post(`${this.domain}`, {
        data: data
      })
      return response
    }
    catch (error) {
      return error
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.domain}/${id}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async getMatchedVouchers(courseID) {
    try {
      const response = await axios.get(`${this.domain}/match-voucher/${courseID}`)
      return response
    }
    catch (error) {
      return error
    }
  }

  async useVoucher(voucherCode) {
    try {
      const response = await axios.post(`${this.domain}/use-voucher/${voucherCode}`)
      return response
    }
    catch (error) {
      return error
    }
  }
}