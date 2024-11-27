import {Toolhouse} from '@toolhouseai/sdk'; // Import the Toolhouse SDK
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  // Initialize the Toolhouse client with the API key from environment variables
  const toolhouse = new Toolhouse({
    apiKey: process.env['TOOLHOUSE_API_KEY']
  })

  // Retrieve tools installed from Toolhouse
  const tools = await toolhouse.tools();
  console.log(tools); // Log the list of tools to the console

  // Retrieve detailed information of tools installed from Toolhouse
  const getTools = await toolhouse.getTools();
  console.log(getTools); // Log the information of tools to the console
})();