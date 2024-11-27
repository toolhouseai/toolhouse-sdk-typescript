# @toolhouseai/sdk TypeScript Examples

This repository demonstrates how to use the `@toolhouseai/sdk` package with Anthropic, OpenAI, and Vercel AI models using TypeScript.

For JavaScript Examples, head over to [examples-js](../examples-js).

## Setup

1. Copy `.env.example` to create your `.env` file
2. Add your API keys to the `.env` file:
```
TOOLHOUSE_API_KEY=your_toolhouse_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
OPENAI_API_KEY=your_openai_api_key
```

## Installation

```bash
npm install
npm run setup
```

## Running Examples

Execute the following commands to run examples for each AI provider:

```bash
npm run anthropic
npm run openai
npm run vercel
```

## Example Files

You can find the example code for each AI provider in the following files:

- [Anthropic Example](./src/anthropicExample.ts)
- [OpenAI Example](./src/openaiExample.ts)
- [Vercel AI Example](./src/vercelExample.ts)