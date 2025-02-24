import { CoreTool, jsonSchema } from "ai";
import { ToolhouseApiModelsGenericProvider } from "./services/tools/models/toolhouse-api-models-providers-providers-tools-generic-tool";
import { ArgumentSchema, createArgumentSchema } from "./schema";
import { RequestConfig } from "./http/types";
import { ToolsService } from "./services/tools";
import { MetadataType } from "./http/types";

interface ToolhouseError {
  metadata: {
    status: number;
  };
}

export function createVercelTools(
  data: ToolhouseApiModelsGenericProvider[],
  bundle: string | undefined,
  metadata: MetadataType,
  provider: "vercel",
  serviceTools: ToolsService,
  requestConfig?: RequestConfig
): Record<string, CoreTool<any, any>> {
  return data.reduce((tools, tool) => {
    tools[tool.name] = {
      description: tool.description,
      parameters: jsonSchema({
        type: "object",
        properties: tool.arguments.reduce((args, argument) => {
          args[argument.name] = createArgumentSchema(argument);
          return args;
        }, {} as Record<string, ArgumentSchema>),
      }),
      execute: async (params) => {
        const toolBody = {
          provider,
          metadata,
          bundle: bundle ?? "default",
          content: {
            name: tool.name,
            input: params,
          },
        };
        try {
          const { data } = await serviceTools.runTools(toolBody, requestConfig);
          return data?.content.content;
        } catch (error) {
          if (error && (error as ToolhouseError).metadata?.status === 402) {
            return `ERROR: Notify the user to add Toolhouse Execution credits (Execs) to their account with the message: Unable to execute the ${tool.name} tool. Your account has run out of Toolhouse Execs. Please visit https://app.toolhouse.ai/billing to top up your Execs balance.`;
          }
          return null;
        }
      },
    };
    return tools;
  }, {} as Record<string, CoreTool<any, any>>);
}
