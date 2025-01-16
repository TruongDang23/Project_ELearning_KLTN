import catchAsync from '../utils/catchAsync.js'
import client from '../config/connAzureOpenAI.js'

const chatAI = catchAsync(async (req, res, next) => {
  const { context } = req.body
  try {
    const result = await client.chat.completions.create({
      messages: context,
      model: ""
    })
    res.status(200).send(result.choices[0].message.content)
  }
  catch (error) {
    res.status(500).send(error)
  }
})

const chatBot = catchAsync(async (req, res, next) => {})

export default { chatAI, chatBot }
