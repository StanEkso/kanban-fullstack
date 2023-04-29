const nodeEnv = process.env.NODE_ENV ?? 'development';
export const CONFIG_MODULE_CONFIG = {
  envFilePath: `${process.cwd()}/env/${nodeEnv}.env`,
  isGlobal: true,
} as const;
