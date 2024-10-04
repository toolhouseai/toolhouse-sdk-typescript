import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

dotenv.config()

async function main() {
  const toolhouse = new Toolhouse({
    // baseUrl: 'https://g6dywws9a0.execute-api.us-west-2.amazonaws.com/v1',
    baseUrl: 'https://api.testing.toolhouse.ai/v1',
    apiKey: process.env['TOOLHOUSE_API_KEY'],
    provider: 'vercel_ai'
  })
  const tools = await toolhouse.getTools()
  console.log(JSON.stringify(tools))
  // const {
  //   text, // combined text
  //   usage, // combined usage of all steps
  // } = await generateText({
  //   model: openai('gpt-4o'),
  //   tools: tools,
  //   prompt: 'Search information about Etiqa s.r.l',
  // })
  // console.log(text)
  // console.log('********')
  // console.log(usage)
}

main();