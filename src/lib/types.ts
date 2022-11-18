/* eslint-disable */
import type { SvelteComponent } from 'svelte'

export type ComponentsMap = Record<string, Component>
export type Component = typeof SvelteComponent
