import { Toolhouse } from "@toolhouseai/sdk"; // Import the Toolhouse SDK
import { anthropic } from "@ai-sdk/anthropic";
import { CoreMessage, CoreTool, generateText } from "ai";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // Initialize the Toolhouse client with the API key from environment variables
  const toolhouse = new Toolhouse({
    apiKey: process.env["TOOLHOUSE_API_KEY"],
    provider: "vercel",
  });

  // Retrieve tools installed from Toolhouse
  const tools = (await toolhouse.getTools()) as Record<
    string,
    CoreTool<any, any>
  >;
  const history = [
    { role: "user", content: "Is 433 a prime number?" },
  ] as CoreMessage[];
  const { text, toolResults } = await generateText({
    model: anthropic("claude-3-haiku-20240307"),
    tools,
    messages: history,
  }); // Pass on the tools to the generateText function
  console.log(`text: '${text}`);
  console.log("toolResults"); // Log the results of tool usage to the console
  console.log(JSON.stringify(toolResults)); // Log the results of tool usage to the console
}

main();
