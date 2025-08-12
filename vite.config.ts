import { resolve } from "path";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiGateway =
    env.API_GATEWAY ?? env.VITE_API_GATEWAY ?? "http://localhost:3000";

  return {
    root: resolve(__dirname, "frontend"),
    envDir: resolve(__dirname, "."),
    publicDir: resolve(__dirname, "frontend/public"),
    plugins: [react()],
    define: {
      "PROCESS.ENV.API_GATEWAY": JSON.stringify(apiGateway),
    },
    build: {
      outDir: resolve(__dirname, "dist"),
      emptyOutDir: false,
    },
  };
});
