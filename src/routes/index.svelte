<script lang="ts">
  import Markdoc from '$lib/Markdoc.svelte'
  import markdoc from '@markdoc/markdoc'
  import { config } from '../markdoc.config'
  import Callout from '$components/Callout.svelte'
  import Counter from '$components/Counter.svelte'

  const source = `
  # {% $title %}

  Markdoc is a Markdown-based syntax and toolchain for creating custom documentation sites. Stripe created Markdoc to power [our public docs](http://stripe.com/docs).

  {% callout type="check" %}
  Markdoc is open-source—check out its [source](http://github.com/markdoc/markdoc) to see how it works.
  {% /callout %}

  ## How is Markdoc different?

  Markdoc uses a fully declarative approach to composition and flow control, where other solutions… [Read more](/docs/overview).

  ## Next steps
  - [Install Markdoc](/docs/getting-started)
  - [Explore the syntax](/docs/syntax)
  
  ## From partial:

  {% partial file="partial" /%}
  `

  const ast = markdoc.parse(source)
  const content = markdoc.transform(ast, config)

  const components = {
    Callout,
    Counter
  }
</script>

<Markdoc {content} {components} />

<style>
  :global(body) {
    padding: 80px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(article) {
    max-width: 60ch;
  }
</style>
