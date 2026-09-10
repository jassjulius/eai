import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Project identity comes from the single config file at the repo root.
const config = JSON.parse(readFileSync(new URL('../eai.config.json', import.meta.url), 'utf8'));
// Absolute path to the compiled index, injected so page code does not depend on cwd.
const indexPath = fileURLToPath(new URL('./public/index.json', import.meta.url));

export default defineConfig({
  site: config.site.url,
  base: config.site.base,
  trailingSlash: 'always',
  output: 'static',
  vite: { define: { __INDEX_PATH__: JSON.stringify(indexPath) } },
});
