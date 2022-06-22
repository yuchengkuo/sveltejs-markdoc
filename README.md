# sveltejs-markdoc

Render [Markdoc](https://markdoc.io) renderable nodes in [Svelte](https://svelte.dev) projects.

## Installation

The library uses `<svelte:element />`, which means you must have **`svelte@3.47` or higher version**

```bash
npm i sveltejs-markdoc
```

## Usage

```svelte
<script>
import { parse, transform } from '@markdoc/markdoc'
import Markdoc from 'sveltejs-markdoc'

const source = `
# Hello world!

Markdoc is a Markdown-based document format and a framework for content publishing.
`

const ast = parse(source)
const content = transform(ast)
</script>

<Markdoc {content} /> <-- pass the renderable tree
```

## Rendering Svelte components

To render a Svelte component, provide the components object along with the content. The components object specifies a mapping from your tags and nodes to the corresponding Svelte components. Learn more about tags and nodes at [Markdoc's documentation](https://markdoc.io/docs/tags).

```svelte
<script>
import { parse, transform } from '@markdoc/markdoc'
import Markdoc from 'sveltejs-markdoc'
import Callout from '$lib/Callout.svelte'

const tags = {
  callout: {
    render: 'Callout', <-- name of the component to render
    attributes: {
      type: {
        type: String,
        default: 'note',
        matches: ['caution', 'check', 'note', 'warning']
      }
    }
  }
}

const source = `
# Hello world!

{% callout type="note" %}
Now we can render it in Svelte!
{% /callout %}
`

const ast = parse(source)
const content = transform(ast, tags)

const components = {
    Callout: Callout <-- rendered name and the Svelte component pair
}
</script>

<Markdoc {content} {components} /> <-- pass the components
```

```svelte
<div class="callout">
  <slot />
</div>

<style>
  .callout {...}
</style>
```
