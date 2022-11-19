import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],

  server: {
    fs: {
      strict: false
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',

    setupFiles: ['./setupTest.ts'],
    coverage: {
      exclude: ['setupTest.ts']
    }
  }
}

export default config
