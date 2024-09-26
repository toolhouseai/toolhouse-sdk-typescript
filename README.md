# Toolhouse TypeScript SDK 1.0.0

Welcome to the Toolhouse SDK documentation. This guide will help you get started with integrating and using the Toolhouse SDK in your project.

## Versions

- API version: `1.0.0`
- SDK version: `1.0.0`

## About the API

Toolhouse API

## Table of Contents

- [Setup & Configuration](#setup--configuration)
  - [Supported Language Versions](#supported-language-versions)
  - [Installation](#installation)
- [Authentication](#authentication)
  - [Access Token Authentication](#access-token-authentication)
- [Setting a Custom Timeout](#setting-a-custom-timeout)
- [Sample Usage](#sample-usage)
- [Services](#services)
- [Models](#models)
- [License](#license)

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm`:

```bash
npm install @toolhouseai/toolhouse-sdk-typescript
```

## Authentication

### Access Token Authentication

The Toolhouse API uses an Access Token for authentication.

This token must be provided to authenticate your requests to the API.

#### Setting the Access Token

When you initialize the SDK, you can set the access token as follows:

```ts
const sdk = new Toolhouse({ token: 'YOUR_TOKEN' });
```

If you need to set or update the access token after initializing the SDK, you can use:

```ts
const sdk = new Toolhouse();
sdk.token = 'YOUR_TOKEN';
```

## Setting a Custom Timeout

You can set a custom timeout for the SDK's HTTP requests as follows:

```ts
const toolhouse = new Toolhouse({ timeout: 10000 });
```

# Sample Usage

Below is a comprehensive example demonstrating how to authenticate and call a simple endpoint:

```ts
import { Toolhouse } from '@toolhouseai/toolhouse-sdk-typescript';

(async () => {
  const toolhouse = new Toolhouse({
    token: 'YOUR_TOKEN',
  });

  const { data } = await toolhouse.tools.toolsToolsGet();

  console.log(data);
})();
```

## Services

The SDK provides various services to interact with the API.

<details> 
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                   |
| :----------------------------------------------------- |
| [ToolsService](documentation/services/ToolsService.md) |

</details>

## Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                                                                     | Description                                          |
| :--------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| [PublicTool](documentation/models/PublicTool.md)                                                                                         | ToolHouse Tools Configuration                        |
| [GetToolsRequest](documentation/models/GetToolsRequest.md)                                                                               | Represents a tool call for Toolhouse.                |
| [GetToolsRequestGetToolsPostOkResponse](documentation/models/GetToolsRequestGetToolsPostOkResponse.md)                                   |                                                      |
| [RunToolsRequest](documentation/models/RunToolsRequest.md)                                                                               | Represents a tool call for Toolhouse.                |
| [RunToolsResponse](documentation/models/RunToolsResponse.md)                                                                             | Represents the results of a tool call for Toolhouse. |
| [Argument](documentation/models/Argument.md)                                                                                             | Tool Arguments                                       |
| [ToolhouseApiModelsProvidersProvidersToolsOpenaiTool](documentation/models/ToolhouseApiModelsProvidersProvidersToolsOpenaiTool.md)       |                                                      |
| [ToolhouseApiModelsProvidersProvidersToolsAnthropicTool](documentation/models/ToolhouseApiModelsProvidersProvidersToolsAnthropicTool.md) |                                                      |
| [Function\_](documentation/models/Function_.md)                                                                                          |                                                      |
| [Parameters](documentation/models/Parameters.md)                                                                                         |                                                      |
| [Property](documentation/models/Property.md)                                                                                             |                                                      |
| [InputSchema](documentation/models/InputSchema.md)                                                                                       |                                                      |
| [Metadata](documentation/models/Metadata.md)                                                                                             | Metadata Model                                       |
| [AntropicToolRequest](documentation/models/AntropicToolRequest.md)                                                                       |                                                      |
| [OpenAiToolRequest](documentation/models/OpenAiToolRequest.md)                                                                           | Represents a tool call for OpenAI.                   |
| [OpenAiFunction](documentation/models/OpenAiFunction.md)                                                                                 | Represents a function call for OpenAI.               |
| [OpenAiToolResponse](documentation/models/OpenAiToolResponse.md)                                                                         | Represents the results of a tool call for OpenAI.    |
| [AnthropicToolResponse](documentation/models/AnthropicToolResponse.md)                                                                   | Represents the results of a tool call for Anthropic. |

</details>

## License

This SDK is licensed under the Apache-2.0 License.

See the [LICENSE](LICENSE) file for more details.

<!-- This file was generated by liblab | https://liblab.com/ -->
