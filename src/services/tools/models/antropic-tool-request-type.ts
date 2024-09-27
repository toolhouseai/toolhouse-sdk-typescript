import { z } from 'zod';

export const antropicToolRequestType = z.literal('tool_use')

export type AntropicToolRequestType = z.infer<typeof antropicToolRequestType>;
