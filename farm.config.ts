import { defineConfig } from "@farmfe/core";

export default defineConfig(({ mode }) => ({
  plugins: ["@farmfe/plugin-react"],
  compilation: {
    output: {
      path: "dist",
      publicPath: "/",
      filename: mode === "production" ? "[name].[hash].js" : "[name].js",
    },
    sourcemap: mode !== "production",
  },
}));
