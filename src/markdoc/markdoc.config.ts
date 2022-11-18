import markdoc, { type Config } from '@markdoc/markdoc'
import { callout } from './callout.markdoc'
import { heading } from './heading.markdoc'
import { counter } from './counter.markdoc'

const partial = `
Using with [Svelte](https://svelte.dev)

Install \`markdoc-svelte\` by running \`npm i -D markdoc-svelte\`

{% counter /%}
`

export const config: Config = {
  nodes: {
    heading
  },
  tags: {
    callout,
    counter
  },
  partials: {
    partial: markdoc.parse(partial)
  },
  variables: {
    title: 'What is Markdoc?'
  }
}
