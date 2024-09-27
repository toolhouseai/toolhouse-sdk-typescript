import OpenAI from 'openai';
import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

const toolhouse = new Toolhouse({
  baseUrl: 'https://g6dywws9a0.execute-api.us-west-2.amazonaws.com/v1'
})

type Tools = OpenAI.Chat.Completions.ChatCompletionTool[] | undefined
const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [{ role: 'user', content: 'Search information about Etiqa s.r.l' }];

async function main1() {
  const allTools = await toolhouse.getTools()

  const chatCompletion = await client.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    tools: allTools as Tools
  })

  console.log(chatCompletion)
  // const {data: list} = await toolhouse.runTools(chatCompletion, true)

  // unisco i messaggi di run tools con messages  in nuovaLista
  // const chatCompletion = await client.chat.completions.create({
  //   messages: nuovaLista,
  //   model: 'gpt-3.5-turbo',
  //   tools: allTools as Tools
  // }) 
  // ritorna chatCompletion
}
async function main2() {
  const bundleTools = await toolhouse.getTools('bundle1')
  const chatCompletion = await client.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    tools: bundleTools as Tools
  })

  console.log(chatCompletion)
}

main1();
main2();