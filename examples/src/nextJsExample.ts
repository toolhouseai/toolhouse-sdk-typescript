import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';
import { openai } from '@ai-sdk/openai';
import { CoreTool, generateText } from 'ai';

dotenv.config()

async function main() {
  const toolhouse = new Toolhouse({
    baseUrl: 'https://api.testing.toolhouse.ai/v1',
    apiKey: process.env['TOOLHOUSE_API_KEY'],
    provider: 'vercel'
  })
  const tools = await toolhouse.getTools() as Record<string, CoreTool<any, any>>
  console.log(JSON.stringify(tools))
  const {
    text, // combined text
    usage, // combined usage of all steps
  } = await generateText({
    model: openai('gpt-4o'),
    tools,
    prompt: 'Give me a random emoji', // non richiede parametri d'ingresso
    //   prompt: 'Check if 43 is a prime number', // accetta argomento di tipo number
  })
  console.log(text)
  console.log('********')
  console.log(usage)
}

main();