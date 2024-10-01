import OpenAI from 'openai';
import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const toolhouse = new Toolhouse({
    baseUrl: 'https://g6dywws9a0.execute-api.us-west-2.amazonaws.com/v1'
  })
  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  })
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [{ role: 'user', content: 'Search information about Etiqa s.r.l' }]

  const tools = await toolhouse.getTools()

  const chatCompletion = await client.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    tools
  })

  const openAiMessage = await toolhouse.runTools(chatCompletion)

  const newMessages = [...messages, ...openAiMessage]
  const chatCompleted = await client.chat.completions.create({
    messages: newMessages,
    model: 'gpt-3.5-turbo',
    tools
  })

  console.log(JSON.stringify(chatCompleted))
}

main();