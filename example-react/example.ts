import { Toolhouse } from '@toolhouseai/sdk';
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState()

  useEffect(() => {
    (async () => {
      try {
        await testTool();
      } catch (e) {
        console.error(e);
      }
    })().catch(e => { console.error(e); });
  }, []);

  // (...)
}

export const toolhouseKey = process.env.REACT_APP_TOOLHOUSE_API_KEY
export const testTool = async (): Promise<void> => {
  const metadata = {
    id: 'your_id',
    timezone: '0'
  };
  const toolhouse = new Toolhouse({
    apiKey: toolhouseKey,
    metadata
  });
  const tools = await toolhouse.getTools();
  console.log(tools);
};
