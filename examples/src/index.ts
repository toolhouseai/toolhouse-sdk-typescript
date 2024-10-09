import Toolhouse from '@toolhouseai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  const toolhouse = new Toolhouse({
    apiKey: process.env['TOOLHOUSE_API_KEY']
  })

  const tools = await toolhouse.tools();
  console.log(JSON.stringify(tools))

  const getTools = await toolhouse.getTools();
  console.log(JSON.stringify(getTools))
})();