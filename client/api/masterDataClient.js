import axios from 'axios'
import { ApiClient } from './apiClient'

export class MasterDataClient extends ApiClient {
  constructor() {
    super("masterdata")
  }
}