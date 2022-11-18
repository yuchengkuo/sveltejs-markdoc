/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Tag } from '@markdoc/markdoc'

export function isTag(tag: any): tag is Tag {
  return !!(tag?.$$mdtype === 'Tag')
}
