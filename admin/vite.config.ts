/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ['./src/setupTest.ts'],
  },
  server: {
    port: 3000,
  },
});

// cmd
// yarn add vitest jsdom @testing-library/react  @testing-library/jest-dom -D