const config = {
  token: {
    type: "Bearer",
    accessToken: localStorage.getItem("access_token"),
  },
  env: import.meta.env.VITE_ENVIRONMENT,
};

export const { token } = config;
