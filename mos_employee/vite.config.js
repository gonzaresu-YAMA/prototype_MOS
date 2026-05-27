import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 本番ビルド時のみ GitHub Pages のサブパスを base にする（dev はルート）
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/prototype_MOS/staff/' : '/',
  server: {
    port: 5174,
  },
}))
