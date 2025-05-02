import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Habilita las funciones globales como 'describe', 'it', etc.
    environment: 'jsdom', // Usa jsdom para simular un navegador
    setupFiles: './src/setupTests.ts', // Configura archivos de configuración previos a las pruebas
    css: true, // Habilita la configuración de CSS en pruebas
  },
})
