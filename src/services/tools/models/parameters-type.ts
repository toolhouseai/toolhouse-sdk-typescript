import { z } from 'zod';

export const parametersType = z.literal('object')

export type ParametersType = z.infer<typeof parametersType>;
