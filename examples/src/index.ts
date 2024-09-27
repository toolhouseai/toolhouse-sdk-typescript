import Toolhouse from '@toolhouseai/toolhouse-sdk-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  const toolhouse = new Toolhouse({
    baseUrl: 'https://g6dywws9a0.execute-api.us-west-2.amazonaws.com/v1'
  })

  // const { data: tools } = await toolhouse.tools();
  // console.log(tools);

  const { data: getTools } = await toolhouse.getTools();
  console.log(getTools);
})();