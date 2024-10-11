import { Toolhouse } from '@toolhouseai/sdk';
import { anthropic } from '@ai-sdk/anthropic';
import { CoreMessage, CoreTool, generateText } from 'ai';
import * as dotenv from 'dotenv';

dotenv.config()

async function main() {
  const toolhouse = new Toolhouse({
    apiKey: process.env['TOOLHOUSE_API_KEY'],
    provider: 'vercel'
  })
  const tools = await toolhouse.getTools() as Record<string, CoreTool<any, any>>
  const history = [{ role: 'user', content: 'Is 433 a prime number?' }] as CoreMessage[]
  const { text, toolResults } = await generateText({
    model: anthropic('claude-3-haiku-20240307'),
    tools,
    messages: history
  })
  console.log(`text: '${text}`)
  console.log('toolResults')
  console.log(JSON.stringify(toolResults))
}

main();