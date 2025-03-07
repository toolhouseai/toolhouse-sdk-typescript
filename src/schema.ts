export type ArgumentType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "integer"
  | "array";

export type ArrayItemsType = "string" | "number" | "boolean" | "integer";

interface BaseArgumentSchema {
  type: ArgumentType;
  description: string;
}

interface ArrayArgumentSchema extends BaseArgumentSchema {
  type: "array";
  items: { type: ArrayItemsType };
}

interface SimpleArgumentSchema extends BaseArgumentSchema {
  type: Exclude<ArgumentType, "array">;
}

export type ArgumentSchema = ArrayArgumentSchema | SimpleArgumentSchema;

export function createArgumentSchema(argument: {
  type: ArgumentType;
  name: string;
  description: string;
  items?: { type: ArrayItemsType } | null;
}): ArgumentSchema {
  if (argument.type === "array" && argument.items && argument.items.type) {
    return {
      type: argument.type,
      description: argument.description,
      items: {
        type: argument.items.type,
      },
    };
  }
  return {
    type: argument.type as Exclude<ArgumentType, "array">,
    description: argument.description,
  };
}
