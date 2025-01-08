import { AzureOpenAI } from 'openai/index.mjs'
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

const endpoint = process.env.AZURE_OPENAI_ENDPOINT
const apiKey = process.env.AZURE_OPENAI_API_KEY
const apiVersion = process.env.AZURE_OPENAI_API_VERSION
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT

const client = new AzureOpenAI({
  endpoint,
  apiKey,
  apiVersion,
  deployment
})

export default client
