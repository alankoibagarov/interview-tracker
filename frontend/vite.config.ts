import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default ({ mode }: { mode: string }) => {
  // load root .env
  const env = loadEnv(mode, path.resolve(__dirname, "..")); // points to repo root
  return defineConfig({
    plugins: [react()],
    // Vite exposes variables with VITE_ prefix automatically
    define: {
      "process.env": {
        ...env,
      },
    },
  });
};
