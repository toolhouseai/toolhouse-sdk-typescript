
export const readEnv = (env: string): string | undefined => {
  if (typeof process !== 'undefined') {
    return process.env?.[env]?.trim() ?? undefined;
  }
  return undefined;
};
