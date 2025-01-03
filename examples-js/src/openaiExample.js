import OpenAI from 'openai';
import {Toolhouse} from '@toolhouseai/sdk'; // Import the Toolhouse SDK
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  // Initialize the Toolhouse client with the API key from environment variables
  const toolhouse = new Toolhouse({
    apiKey: process.env['TOOLHOUSE_API_KEY']
  })
  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  })
  const messages= [{ role: 'user', content: 'Search information about Toolhouse' }]

  // Retrieve tools installed from Toolhouse
  const tools = await toolhouse.getTools()
  const chatCompletion = await client.chat.completions.create({
    messages,
    model: 'gpt-4-turbo',
    tools
  })

  // Run the tools using the Toolhouse client with the created message
  const openAiMessage = await toolhouse.runTools(chatCompletion)

  const newMessages = [...messages, ...openAiMessage]
  const chatCompleted = await client.chat.completions.create({
    messages: newMessages,
    model: 'gpt-4-turbo',
    tools
  })

  console.log(JSON.stringify(chatCompleted))
}

main();