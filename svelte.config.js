import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    alias: {
      'svelte-markdoc': 'src/lib',
      $components: 'src/components'
    }
  },

  package: {
    exports: (file) => file === 'index.ts'
  }
}

export default config
