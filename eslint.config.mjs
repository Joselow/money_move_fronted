// eslint.config.mjs
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  // Ignorados globales
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/coverage/**',
      '**/.vite/**'
    ]
  },

  // Presets Vue + TS (flat)
  ...pluginVue.configs['flat/essential'], // o 'flat/recommended'
  vueTsConfigs.recommended,

  // Ámbito y reglas del proyecto
  {
    files: ['src/**/*.{ts,tsx,js,jsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'warn',
      'vue/no-unused-components': 'warn'
    }
  }
)