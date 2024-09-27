import { z } from 'zod';

export const openAiToolRequestType = z.literal('function')

export type OpenAiToolRequestType = z.infer<typeof openAiToolRequestType>;
