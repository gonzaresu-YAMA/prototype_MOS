import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
// 本番ビルド時のみ GitHub Pages のサブパスを base にする（dev はルート）
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  base: command === 'build' ? '/prototype_MOS/customer/' : '/',
}))
