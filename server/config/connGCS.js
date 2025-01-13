/* eslint-disable no-undef */
import dotenv from 'dotenv'
import { Storage } from '@google-cloud/storage'

dotenv.config({ path: './config.env' })

//authenticate ggcloud storage
const storage = new Storage({
  projectId: "project-elearning-424401",
  credentials: {
    type: "service_account",
    project_id: "project-elearning-424401",
    private_key_id: process.env.GCS_PRIVATE_KEY_ID,
    private_key: process.env.GCS_PRIVATE_KEY,
    client_email: "nodejs-goocloudstorage@project-elearning-424401.iam.gserviceaccount.com",
    client_id: "112818077253194123938",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/nodejs-goocloudstorage%40project-elearning-424401.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }
})

export default storage