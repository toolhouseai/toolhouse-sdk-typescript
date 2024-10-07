import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  const toolhouse = new Toolhouse({
    baseUrl: 'https://api.testing.toolhouse.ai/v1',
    apiKey: process.env['TOOLHOUSE_API_KEY']
  })

  const tools = await toolhouse.tools();
  console.log(JSON.stringify(tools))

  // const getTools = await toolhouse.getTools();
  // console.log(JSON.stringify(getTools))
})();