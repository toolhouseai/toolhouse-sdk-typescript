import { z } from "zod";
import { argumentType } from "./argument-type";

export const ArrayItemsType = z.union([
  z.literal("string"),
  z.literal("number"),
  z.literal("boolean"),
  z.literal("integer"),
]);

/**
 * The shape of the model inside the application code - what the users use
 */
export const toolhouseApiModelsGenericProvider = z.lazy(() => {
  return z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    arguments: z.array(genericArgument),
  });
});

/**
 * The shape of the model inside the application code - what the users use
 */
export const genericArgument = z.lazy(() =>
  z.object({
    name: z.string(),
    type: argumentType,
    description: z.string(),
    required: z.boolean(),
    items: z
      .object({
        type: ArrayItemsType,
      })
      .optional() // This allows items to be not provided
      .nullable(), // This allows items to be explicitly set to null
  })
);

/**
 * Tool Arguments
 * @typedef  {GenericArgument} genericArgument - Tool Arguments - Tool Arguments
 * @property {string}
 * @property {ArgumentType}
 * @property {string}
 * @property {boolean}
 */
export type GenericArgument = z.infer<typeof genericArgument>;

export type ToolhouseApiModelsGenericProvider = z.infer<
  typeof toolhouseApiModelsGenericProvider
>; 