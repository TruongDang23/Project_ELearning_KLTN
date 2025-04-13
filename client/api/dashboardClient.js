import axios from 'axios'
import { ApiClient } from './apiClient'

export class DashboardClient extends ApiClient {
  constructor() {
    super('dashboard')
  }
}
