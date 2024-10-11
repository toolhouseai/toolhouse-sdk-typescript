import Anthropic from '@anthropic-ai/sdk';
import { Toolhouse } from '@toolhouseai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const client = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  })
  const toolhouse = new Toolhouse({
    provider: 'anthropic',
    apiKey: process.env['TOOLHOUSE_API_KEY'],
    metadata: { timezone: 'UTC' }
  })
  const messages: Anthropic.Messages.MessageParam[] = [{ role: 'user', content: 'Search information about Etiqa s.r.l' }]

  const tools = await toolhouse.getTools() as Anthropic.Messages.Tool[]
  const message = await client.messages.create({
    max_tokens: 1024,
    messages,
    model: 'claude-3-opus-20240229',
    tools
  })
  const anthropicMessage = await toolhouse.runTools(message) as Anthropic.Messages.MessageParam[]

  const newMessages = [...messages, ...anthropicMessage]
  const chatCompleted = await client.messages.create({
    max_tokens: 1024,
    messages: newMessages,
    model: 'claude-3-opus-20240229',
    tools
  })

  console.log(JSON.stringify(chatCompleted))
}

main()