# sveltejs-markdoc

Render [Markdoc](https://markdoc.io) renderable nodes in [Svelte](https://svelte.dev)/[SvelteKit](https://kit.svelte.dev) projects.

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

### Provide Svelte component in Markdoc Schema

To render a Svelte component, provide the Svelte component in Markdoc Schema name.

```svelte
<!-- +page.svelte -->
<script>
import { parse, transform } from '@markdoc/markdoc'
import Markdoc from 'sveltejs-markdoc'
import Callout from './Callout.svelte'

const config = {
  callout: {
    render: Callout, <-- pass the component
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
const content = transform(ast, config)

</script>

<Markdoc {content} />
```

```svelte
<!-- Callout.svelte -->
<div class="callout">
  <slot />
</div>

<style>
  .callout {
    ...;
  }
</style>
```

This library also provide `MarkdocSvelteSchema` type that could be used.

```ts
// Callout.markdoc.ts
import Callout from './Callout.svelte'
import type { MarkdocSvelteSchema } from 'sveltejs-markdoc'

export const callout: MarkdocSvelteSchema = { <-- use the type
  render: Callout,
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['caution', 'check', 'note', 'warning']
    }
  }
}
```

> Notice: This makes the Markdoc `Tag`'s name property not always string type, which should be kept an eye on when other transformation is needed (matching tag name for example).

### Pass Svelte components through props

Provide the components object along with the content. The components object specifies a mapping from your tags and nodes to the corresponding Svelte components. Learn more about tags and nodes at [Markdoc's documentation](https://markdoc.io/docs/tags).

```svelte
<!-- +page.svelte -->
<script>
import { parse, transform } from '@markdoc/markdoc'
import Markdoc from 'sveltejs-markdoc'
import Callout from './Callout.svelte'

const config = {
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
const content = transform(ast, config)

const components = {
    Callout: Callout <-- rendered name and the Svelte component pair
}
</script>

<Markdoc {content} {components} /> <-- pass the components
```

```svelte
<!-- Callout.svelte -->
<div class="callout">
  <slot />
</div>

<style>
  .callout {
    ...;
  }
</style>
```
