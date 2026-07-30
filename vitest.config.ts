import { defineConfig } from 'vitest/config';
// 只測 src/lib 的純函式（splitSpeaker 等），不需要 Astro runtime。
export default defineConfig({ test: { include: ['tests/**/*.test.ts'] } });
