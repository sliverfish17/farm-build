import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*/*.test.ts", "**/*/*.test.tsx"],
    browser: {
      enabled: true,
      name: "chromium",
      headless: true,
    },
    setupFiles: ["./vitest-setup.ts"],
  },
});
