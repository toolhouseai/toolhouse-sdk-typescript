import Anthropic from '@anthropic-ai/sdk';
import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const client = new Anthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  })
  const toolhouse = new Toolhouse({
    baseUrl: 'https://g6dywws9a0.execute-api.us-west-2.amazonaws.com/v1',
    provider: 'anthropic'
  })
  const messages: Anthropic.Messages.MessageParam[] = [{ role: 'user', content: 'Search information about Etiqa s.r.l' }]

  const tools = await toolhouse.getTools('anthropic')
  const message = await client.messages.create({
    max_tokens: 1024,
    messages,
    model: 'claude-3-opus-20240229',
    tools
  })

  const anthropicMessage = await toolhouse.runTools(message, 'anthropic')

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