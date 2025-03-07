import Anthropic from "@anthropic-ai/sdk";
import { Toolhouse } from "@toolhouseai/sdk"; // Import the Toolhouse SDK
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const client = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"],
  });

  // Initialize the Toolhouse client with the provider, API key, and metadata
  const toolhouse = new Toolhouse({
    provider: "anthropic",
    apiKey: process.env["TOOLHOUSE_API_KEY"],
  });
  const messages: Anthropic.Messages.MessageParam[] = [
    { role: "user", content: "Search information about Toolhouse" },
  ];

  // Retrieve tools installed from Toolhouse
  const tools = (await toolhouse.getTools()) as Anthropic.Messages.Tool[];
  const message = await client.messages.create({
    max_tokens: 1024,
    messages,
    model: "claude-3-5-sonnet-20241022",
    tools,
  });

  // Run the tools using the Toolhouse client with the created message
  const anthropicMessage = (await toolhouse.runTools(
    message
  )) as Anthropic.Messages.MessageParam[];

  const newMessages = [...messages, ...anthropicMessage];
  const chatCompleted = await client.messages.create({
    max_tokens: 1024,
    messages: newMessages,
    model: "claude-3-5-sonnet-20241022",
    tools,
  });

  // Log the final response to the console
  console.log(JSON.stringify(chatCompleted));
}

main();
