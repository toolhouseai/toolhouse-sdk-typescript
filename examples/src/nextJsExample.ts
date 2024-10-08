import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import { anthropic } from '@ai-sdk/anthropic';
import { CoreTool, generateText } from 'ai';
import * as dotenv from 'dotenv';

dotenv.config()

async function main() {
  const toolhouse = new Toolhouse({
    baseUrl: 'https://api.testing.toolhouse.ai/v1',
    apiKey: process.env['TOOLHOUSE_API_KEY'],
    provider: 'vercel'
  })
  const tools = await toolhouse.getTools() as Record<string, CoreTool<any, any>>
  // const {
  //   text, // combined text
  //   usage, // combined usage of all steps
  // } = await generateText({
  const data = await generateText({
    model: anthropic('claude-3-haiku-20240307'),
    tools,
    // prompt: 'Give me a random emoji', // non richiede parametri d'ingresso
    prompt: 'Is 433 a prime number?', // accetta argomento di tipo number
  })
  console.log(JSON.stringify(data))
  // console.log(text)
  // console.log('********')
  // console.log(usage)
}

main();