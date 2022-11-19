import '@testing-library/jest-dom'
import Markdoc from '$lib/Markdoc.svelte'
import { render, screen } from '@testing-library/svelte'
import { test, expect } from 'vitest'
import External from './External.test.svelte'

import type { RenderableTreeNodes } from '@markdoc/markdoc'

test('render a tag', () => {
  const content: RenderableTreeNodes = { $$mdtype: 'Tag', name: 'h1', children: ['test', null] }
  render(Markdoc, { content })
  expect(screen.getByText('test')).toBeInTheDocument()
})

test('render a child node with string and number', () => {
  const content: RenderableTreeNodes = { $$mdtype: 'Tag', name: 'h1', children: ['test ', 2] }
  render(Markdoc, { content })
  expect(screen.getByText('test 2')).toBeInTheDocument()
})

test('render nested tags', () => {
  const content: RenderableTreeNodes = {
    $$mdtype: 'Tag',
    name: 'div',
    children: [{ $$mdtype: 'Tag', name: 'p', children: ['hello'] }]
  }
  render(Markdoc, { content })
  expect(screen.getByText('hello')).toBeInTheDocument()
})

test('render fragment', () => {
  const content: RenderableTreeNodes = [
    { $$mdtype: 'Tag', name: 'h1', children: ['test'] },
    { $$mdtype: 'Tag', name: 'p', children: ['hello'] }
  ]
  render(Markdoc, { content })
  expect(screen.getByText('test')).toBeInTheDocument()
  expect(screen.getByText('hello')).toBeInTheDocument()
})

test('render a external svelte component', () => {
  const components = {
    External
  }
  const content: RenderableTreeNodes = {
    $$mdtype: 'Tag',
    name: 'div',
    children: [{ $$mdtype: 'Tag', name: 'External', children: [] }]
  }
  render(Markdoc, { content, components })
  expect(screen.getByText('External')).toBeInTheDocument()
})

test('render a id attribute', () => {
  const content: RenderableTreeNodes = {
    $$mdtype: 'Tag',
    name: 'h1',
    attributes: { id: 'test-id' },
    children: ['test']
  }
  render(Markdoc, { content })
  expect(screen.getByText('test')).toHaveAttribute('id', 'test-id')
})

test('render a class attribute', () => {
  const content: RenderableTreeNodes = {
    $$mdtype: 'Tag',
    name: 'h1',
    attributes: { class: 'epic' },
    children: ['test']
  }
  render(Markdoc, { content })
  expect(screen.getByText('test')).toHaveAttribute('class', 'epic')
})

test('render multiple attributes of boolean, number, string', () => {
  const content: RenderableTreeNodes = {
    $$mdtype: 'Tag',
    name: 'h1',
    attributes: { 'data-highlight': true, level: 1, id: 'test-id' },
    children: ['test']
  }
  render(Markdoc, { content })
  expect(screen.getByText('test')).toHaveAttribute('data-highlight', 'true')
  expect(screen.getByText('test')).toHaveAttribute('level', '1')
  expect(screen.getByText('test')).toHaveAttribute('id', 'test-id')
})
