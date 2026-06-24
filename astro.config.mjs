import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://2026.mopm.tw',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({ i18n: { defaultLocale: 'zh', locales: { zh: 'zh-Hant', en: 'en' } } }),
  ],
});
