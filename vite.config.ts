import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  root: ".",
  resolve: {
    alias: {
      "figma:asset": path.resolve(__dirname, "imports/figma/asset"),
    },
  },
})
