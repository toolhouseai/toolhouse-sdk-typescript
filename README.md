# Toolhouse TypeScript SDK

Welcome to the Toolhouse SDK documentation. This guide will help you get started with integrating and using the Toolhouse SDK in your project.

## About the API

Toolhouse API

## Table of Contents

- [Setup & Configuration](#setup--configuration)
  - [Supported Language Versions](#supported-language-versions)
  - [Installation](#installation)
- [Authentication](#authentication)
  - [Access Token Authentication](#access-token-authentication)
- [Setting Options](#Other-configuration-options)
- [Sample Usage](#sample-usage)
- [Services](#services)
- [License](#license)

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm`:

```bash
npm install @toolhouseai/sdk
```

or `yarn`
```bash
yarn add @toolhouseai/sdk
```

## Authentication

### Access Token Authentication

The Toolhouse API uses an Access Token for authentication.

This token must be provided to authenticate your requests to the API.

You need to register at [toolhouse](https://app.toolhouse.ai/) and obtain an API Key

#### Setting the Access Token

When you initialize the SDK, you can set the access token as follows:

```ts
const toolhouse = new Toolhouse({
    apiKey: process.env['TOOLHOUSE_API_KEY']
  })
```
apiKey is the only mandatory param, represent the API key required to authenticate with the tool provider.

You can check the working examples in this [folder](/examples).

## Other configuration options

- provider: Specifies the provider, such as 'openai' or 'anthropic'. Defaults to 'openai'.
- baseUrl: Optionally specify the base URL for API requests.
- timeoutMs: The timeout for API requests, in milliseconds.

example:
```ts
const toolhouse = new Toolhouse({apiKey: process.env['TOOLHOUSE_API_KEY'], timeoutMs: 10000 });
```

# Sample Usage

Below is a comprehensive example demonstrating how to authenticate and call a simple endpoint:

```ts
import Toolhouse from '@toolhouseai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const toolhouse = new Toolhouse({
    apiKey: process.env['TOOLHOUSE_API_KEY']
  })

  const tools = await toolhouse.tools();
  console.log(tools);
}
main()
```

## Services
### Methods

#### tools
>tools(requestConfig?: RequestConfig): Promise<PublicTool[] | undefined>
This method retrieves a list of public tools available from Toolhouse.

```ts
const tools = await toolhouse.tools();
console.log(tools);
```

requestConfig: Optional. Provides configuration like headers and query parameters.
Returns: A list of PublicTool[] or undefined if no tools are available.

#### getTools
>getTools(bundle?: string, requestConfig?: RequestConfig): Promise<OpenAI.ChatCompletionTool[] | Anthropic.Messages.Tool[]>
This method fetches tools from a specific provider, either OpenAI or Anthropic.

```ts
const tools = await toolhouse.getTools();
console.log(tools);
```
<detail>
bundle: Optional. Specify the bundle of tools (defaults to 'default').
requestConfig: Optional. Provides configuration like headers and query parameters.
Returns: A list of tools specific to the chosen provider.
</detail>

#### runTools
> runTools(body: OpenAI.ChatCompletion | Anthropic.Messages.Message, append?: boolean, requestConfig?: RequestConfig): Promise<(OpenAiToolResponse | OpenAI.ChatCompletionMessageParam)[] | Anthropic.Messages.MessageParam[]>

This method runs tools based on the provider and provided content, using either OpenAI or Anthropic.

```ts
const tools = await toolhouse.getTools()
  const chatCompletion = await client.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
    tools
  })

  const openAiMessage = await toolhouse.runTools(chatCompletion)
  console.log(openAiMessage)
```
body: The content required to execute tools, provided in the format specific to OpenAI or Anthropic.
append: Optional. If true, the response is appended to the original message.
requestConfig: Optional. Provides configuration like headers and query parameters.
Returns: A list of responses from the tools, depending on the provider.

### Accessor Methods
#### metadata
Retrieve or set the metadata used in tool requests.

```ts
console.log(toolhouse.metadata);
toolhouse.metadata = { newKey: 'newValue' };
```
#### provider
Retrieve or set the provider for tool requests.

```ts
console.log(toolhouse.provider);
toolhouse.provider = 'anthropic';
```

#### Error Handling
```ts
try {
  const tools = await toolhouse.tools();
} catch (error) {
  console.error(error.message);
}
```

## License

This SDK is licensed under the Apache-2.0 License.

See the [LICENSE](LICENSE) file for more details.