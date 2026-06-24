# mopm-2026-site

MOPM 2026 官方網站（Astro，部署於 Cloudflare Workers Static Assets，網域 https://2026.mopm.tw）。

## 開發

```bash
npm install
npm run dev      # 本機預覽
npm run build    # 產出 dist/
```

## 部署

Cloudflare Workers（Static Assets）綁定本 GitHub repo：push 到 `main` → 自動 build + deploy 到 https://2026.mopm.tw（同 yoju-site 模式）。

## 內容來源

議程等內容由**私有** repo `embraced/mopm-2026` 的匯入工具產生並寫入本 repo 的 `src/data/*.yaml`，再於此 commit、push 觸發部署。
