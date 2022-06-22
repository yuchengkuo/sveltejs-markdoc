import markdoc, { type Config } from '@markdoc/markdoc'
import { callout } from './schema/Callout.markdoc'
import { heading } from './schema/heading.markdoc'
import { counter } from './schema/Counter.markdoc'

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
