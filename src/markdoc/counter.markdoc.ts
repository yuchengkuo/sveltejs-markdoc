import Counter from '$components/Counter.svelte'

import type { MarkdocSvelteSchema } from '$lib'

export const counter: MarkdocSvelteSchema = {
  render: Counter,
  children: ['paragraph', 'tag', 'list'],
  selfClosing: true
}
