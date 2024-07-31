import { defineConfig } from "astro/config";
import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-naut-template.vercel.app/",
  output: "server",
  adapter: vercel(),
});
