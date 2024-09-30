export type OpenAiTools = ChatCompletionTool[] | undefined

export type OpenAiChatCompletionMessage =
  | ChatCompletionSystemMessageParam
  | ChatCompletionUserMessageParam
  | ChatCompletionAssistantMessageParam
  | ChatCompletionToolMessageParam
  | ChatCompletionFunctionMessageParam;

interface ChatCompletionSystemMessageParam {
  /**
   * The contents of the system message.
   */
  content: string | Array<ChatCompletionContentPartText>;

  /**
   * The role of the messages author, in this case `system`.
   */
  role: 'system';

  /**
   * An optional name for the participant. Provides the model information to
   * differentiate between participants of the same role.
   */
  name?: string;
}

interface ChatCompletionContentPartText {
  /**
   * The text content.
   */
  text: string;

  /**
   * The type of the content part.
   */
  type: 'text';
}

interface ChatCompletionUserMessageParam {
  /**
   * The contents of the user message.
   */
  content: string | Array<ChatCompletionContentPart>;

  /**
   * The role of the messages author, in this case `user`.
   */
  role: 'user';

  /**
   * An optional name for the participant. Provides the model information to
   * differentiate between participants of the same role.
   */
  name?: string;
}

type ChatCompletionContentPart = ChatCompletionContentPartText | ChatCompletionContentPartImage;

interface ChatCompletionContentPartImage {
  image_url: ImageURL;

  /**
   * The type of the content part.
   */
  type: 'image_url';
}

interface ImageURL {
  /**
   * Either a URL of the image or the base64 encoded image data.
   */
  url: string;

  /**
   * Specifies the detail level of the image. Learn more in the
   * [Vision guide](https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding).
   */
  detail?: 'auto' | 'low' | 'high';
}

interface ChatCompletionAssistantMessageParam {
  /**
   * The role of the messages author, in this case `assistant`.
   */
  role: 'assistant';

  /**
   * The contents of the assistant message. Required unless `tool_calls` or
   * `function_call` is specified.
   */
  content?: string | Array<ChatCompletionContentPartText | ChatCompletionContentPartRefusal> | null;

  /**
   * @deprecated: Deprecated and replaced by `tool_calls`. The name and arguments of
   * a function that should be called, as generated by the model.
   */
  function_call?: FunctionCall | null;

  /**
   * An optional name for the participant. Provides the model information to
   * differentiate between participants of the same role.
   */
  name?: string;

  /**
   * The refusal message by the assistant.
   */
  refusal?: string | null;

  /**
   * The tool calls generated by the model, such as function calls.
   */
  tool_calls?: Array<ChatCompletionMessageToolCall>;
}

interface ChatCompletionContentPartRefusal {
  /**
   * The refusal message generated by the model.
   */
  refusal: string;

  /**
   * The type of the content part.
   */
  type: 'refusal';
}

interface FunctionCall {
  /**
   * The arguments to call the function with, as generated by the model in JSON
   * format. Note that the model does not always generate valid JSON, and may
   * hallucinate parameters not defined by your function schema. Validate the
   * arguments in your code before calling your function.
   */
  arguments: string;

  /**
   * The name of the function to call.
   */
  name: string;
}

interface ChatCompletionMessageToolCall {
  /**
   * The ID of the tool call.
   */
  id: string;

  /**
   * The function that the model called.
   */
  function: Function;

  /**
   * The type of the tool. Currently, only `function` is supported.
   */
  type: 'function';
}

interface Function {
  /**
   * The arguments to call the function with, as generated by the model in JSON
   * format. Note that the model does not always generate valid JSON, and may
   * hallucinate parameters not defined by your function schema. Validate the
   * arguments in your code before calling your function.
   */
  arguments: string;

  /**
   * The name of the function to call.
   */
  name: string;
}

interface ChatCompletionToolMessageParam {
  /**
   * The contents of the tool message.
   */
  content: string | Array<ChatCompletionContentPartText>;

  /**
   * The role of the messages author, in this case `tool`.
   */
  role: 'tool';

  /**
   * Tool call that this message is responding to.
   */
  tool_call_id: string;
}

interface ChatCompletionFunctionMessageParam {
  /**
   * The contents of the function message.
   */
  content: string | null;

  /**
   * The name of the function to call.
   */
  name: string;

  /**
   * The role of the messages author, in this case `function`.
   */
  role: 'function';
}

interface ChatCompletionTool {
  function: FunctionDefinition;

  /**
   * The type of the tool. Currently, only `function` is supported.
   */
  type: 'function';
}

interface FunctionDefinition {
  /**
   * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
   * underscores and dashes, with a maximum length of 64.
   */
  name: string;

  /**
   * A description of what the function does, used by the model to choose when and
   * how to call the function.
   */
  description?: string;

  /**
   * The parameters the functions accepts, described as a JSON Schema object. See the
   * [guide](https://platform.openai.com/docs/guides/function-calling) for examples,
   * and the
   * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
   * documentation about the format.
   *
   * Omitting `parameters` defines a function with an empty parameter list.
   */
  parameters?: FunctionParameters;

  /**
   * Whether to enable strict schema adherence when generating the function call. If
   * set to true, the model will follow the exact schema defined in the `parameters`
   * field. Only a subset of JSON Schema is supported when `strict` is `true`. Learn
   * more about Structured Outputs in the
   * [function calling guide](docs/guides/function-calling).
   */
  strict?: boolean | null;
}

/**
 * The parameters the functions accepts, described as a JSON Schema object. See the
 * [guide](https://platform.openai.com/docs/guides/function-calling) for examples,
 * and the
 * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
 * documentation about the format.
 *
 * Omitting `parameters` defines a function with an empty parameter list.
 */
type FunctionParameters = Record<string, unknown>;

/**
 * Represents a chat completion response returned by model, based on the provided
 * input.
 */
export interface OpenAiChatCompletion {
  /**
   * A unique identifier for the chat completion.
   */
  id: string;

  /**
   * A list of chat completion choices. Can be more than one if `n` is greater
   * than 1.
   */
  choices: Array<Choice>;

  /**
   * The Unix timestamp (in seconds) of when the chat completion was created.
   */
  created: number;

  /**
   * The model used for the chat completion.
   */
  model: string;

  /**
   * The object type, which is always `chat.completion`.
   */
  object: 'chat.completion';

  /**
   * The service tier used for processing the request. This field is only included if
   * the `service_tier` parameter is specified in the request.
   */
  service_tier?: 'scale' | 'default' | null;

  /**
   * This fingerprint represents the backend configuration that the model runs with.
   *
   * Can be used in conjunction with the `seed` request parameter to understand when
   * backend changes have been made that might impact determinism.
   */
  system_fingerprint?: string;

  /**
   * Usage statistics for the completion request.
   */
  usage?: CompletionUsage;

  _request_id?: string | null;
}

interface Choice {
  /**
   * The reason the model stopped generating tokens. This will be `stop` if the model
   * hit a natural stop point or a provided stop sequence, `length` if the maximum
   * number of tokens specified in the request was reached, `content_filter` if
   * content was omitted due to a flag from our content filters, `tool_calls` if the
   * model called a tool, or `function_call` (deprecated) if the model called a
   * function.
   */
  finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'function_call';

  /**
   * The index of the choice in the list of choices.
   */
  index: number;

  /**
   * Log probability information for the choice.
   */
  logprobs: Logprobs | null;

  /**
   * A chat completion message generated by the model.
   */
  message: ChatCompletionMessage;
}

interface Logprobs {
  /**
   * A list of message content tokens with log probability information.
   */
  content: Array<ChatCompletionTokenLogprob> | null;

  /**
   * A list of message refusal tokens with log probability information.
   */
  refusal: Array<ChatCompletionTokenLogprob> | null;
}

/**
 * Usage statistics for the completion request.
 */
interface CompletionUsage {
  /**
   * Number of tokens in the generated completion.
   */
  completion_tokens: number;

  /**
   * Number of tokens in the prompt.
   */
  prompt_tokens: number;

  /**
   * Total number of tokens used in the request (prompt + completion).
   */
  total_tokens: number;

  /**
   * Breakdown of tokens used in a completion.
   */
  completion_tokens_details?: CompletionTokensDetails;
}

interface CompletionTokensDetails {
  /**
   * Tokens generated by the model for reasoning.
   */
  reasoning_tokens?: number;
}

/**
 * A chat completion message generated by the model.
 */
interface ChatCompletionMessage {
  /**
   * The contents of the message.
   */
  content: string | null;

  /**
   * The refusal message generated by the model.
   */
  refusal: string | null;

  /**
   * The role of the author of this message.
   */
  role: 'assistant';

  /**
   * @deprecated: Deprecated and replaced by `tool_calls`. The name and arguments of
   * a function that should be called, as generated by the model.
   */
  function_call?: FunctionCall | null;

  /**
   * The tool calls generated by the model, such as function calls.
   */
  tool_calls?: Array<ChatCompletionMessageToolCall>;
}

interface ChatCompletionTokenLogprob {
  /**
   * The token.
   */
  token: string;

  /**
   * A list of integers representing the UTF-8 bytes representation of the token.
   * Useful in instances where characters are represented by multiple tokens and
   * their byte representations must be combined to generate the correct text
   * representation. Can be `null` if there is no bytes representation for the token.
   */
  bytes: Array<number> | null;

  /**
   * The log probability of this token, if it is within the top 20 most likely
   * tokens. Otherwise, the value `-9999.0` is used to signify that the token is very
   * unlikely.
   */
  logprob: number;

  /**
   * List of the most likely tokens and their log probability, at this token
   * position. In rare cases, there may be fewer than the number of requested
   * `top_logprobs` returned.
   */
  top_logprobs: Array<TopLogprob>;
}

interface TopLogprob {
  /**
   * The token.
   */
  token: string;

  /**
   * A list of integers representing the UTF-8 bytes representation of the token.
   * Useful in instances where characters are represented by multiple tokens and
   * their byte representations must be combined to generate the correct text
   * representation. Can be `null` if there is no bytes representation for the token.
   */
  bytes: Array<number> | null;

  /**
   * The log probability of this token, if it is within the top 20 most likely
   * tokens. Otherwise, the value `-9999.0` is used to signify that the token is very
   * unlikely.
   */
  logprob: number;
}