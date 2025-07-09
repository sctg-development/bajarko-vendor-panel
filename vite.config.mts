import inject from "@medusajs/admin-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import inspect from "vite-plugin-inspect"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_MEDUSA_BASE || "/"
  const BACKEND_URL = env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000"
  const STOREFRONT_URL =
    env.VITE_MEDUSA_STOREFRONT_URL || "http://localhost:8000"
  const PUBLISHABLE_API_KEY = env.VITE_PUBLISHABLE_API_KEY || ""
  const TALK_JS_APP_ID = env.VITE_TALK_JS_APP_ID || ""
  const DISABLE_SELLERS_REGISTRATION =
    env.VITE_DISABLE_SELLERS_REGISTRATION || "false"

  if (PUBLISHABLE_API_KEY === "") {
    console.error(
      "VITE_PUBLISHABLE_API_KEY is not set. Please set it in your .env file to avoid issues with the Medusa Admin UI."
    )
    throw new Error(
      "VITE_PUBLISHABLE_API_KEY is not set. Please set it in your .env file to avoid issues with the Medusa Admin UI."
    )
  }
  if (PUBLISHABLE_API_KEY.startsWith("$")) {
    console.error(
      "VITE_PUBLISHABLE_API_KEY is not expanded. Please set it in your .env file to avoid issues with the Medusa Admin UI."
    )
    throw new Error(
      "VITE_PUBLISHABLE_API_KEY is not expanded. Please set it in your .env file to avoid issues with the Medusa Admin UI."
    )
  }
  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   */
  const MEDUSA_PROJECT = env.VITE_MEDUSA_PROJECT || null
  const sources = MEDUSA_PROJECT ? [MEDUSA_PROJECT] : []

  console.log(`Starting Vendor panel UI with the following environment variables:
  BASE: ${BASE}
  BACKEND_URL: ${BACKEND_URL}
  STOREFRONT_URL: ${STOREFRONT_URL}
  PUBLISHABLE_API_KEY: ${PUBLISHABLE_API_KEY}
  TALK_JS_APP_ID: ${TALK_JS_APP_ID}
  DISABLE_SELLERS_REGISTRATION: ${DISABLE_SELLERS_REGISTRATION}
  MEDUSA_PROJECT: ${MEDUSA_PROJECT}`);
  return {
    plugins: [
      inspect(),
      react(),
      inject({
        sources,
      }),
    ],
    define: {
      __BASE__: JSON.stringify(BASE),
      __BACKEND_URL__: JSON.stringify(BACKEND_URL),
      __STOREFRONT_URL__: JSON.stringify(STOREFRONT_URL),
      __PUBLISHABLE_API_KEY__: JSON.stringify(PUBLISHABLE_API_KEY),
      __TALK_JS_APP_ID__: JSON.stringify(TALK_JS_APP_ID),
      __DISABLE_SELLERS_REGISTRATION__: JSON.stringify(
        DISABLE_SELLERS_REGISTRATION
      ),
    },
    server: {
      open: false,
    },
    optimizeDeps: {
      entries: [],
      include: ["recharts"],
    },
  }
})
