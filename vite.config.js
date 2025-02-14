import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const repositoryName = "react-output-test-v2";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? `/${repositoryName}/` : "/",
  test: {
    global: true,
    environment: "jsdom",
    setupFiles: "src/setup.js",
  },
});
