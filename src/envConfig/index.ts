const envConfig = {
  api: {
    host: import.meta.env.VITE_API_HOST,
    version: "0.0.1",
  },
  env: import.meta.env.VITE_ENVIRONMENT,
};

export const { api, env } = envConfig;
