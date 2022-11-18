import type { Schema } from '@markdoc/markdoc'

export const counter: Schema = {
  render: 'Counter',
  children: ['paragraph', 'tag', 'list'],
  selfClosing: true
}
