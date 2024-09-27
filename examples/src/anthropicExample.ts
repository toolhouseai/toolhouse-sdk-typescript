import Anthropic from '@anthropic-ai/sdk';
import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

const apikey = process.env['ANTHROPIC_API_KEY']

const client = new Anthropic({
  apiKey: apikey,
});

const toolhouse = new Toolhouse({
  baseUrl: 'https://g6dywws9a0.execute-api.us-west-2.amazonaws.com/v1',
  provider: 'anthropic'
})

type Tools = Anthropic.Messages.Tool[] | undefined

async function main1() {
  const allTools = await toolhouse.getTools()
  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Search information about Etiqa s.r.l' }],
    model: 'claude-3-opus-20240229',
    tools: allTools as Tools
  });

  console.log(message);
}

async function main2() {
  const bundleTools = await toolhouse.getTools('bundle1')
  const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: 'Search information about Etiqa s.r.l' }],
    model: 'claude-3-opus-20240229',
    tools: bundleTools as Tools
  });

  console.log(message);
  console.log(message);
}

main1();
main2();