<script lang="ts" context="module">
  export type ComponentsMap = Record<string, Component>
  export type Component = typeof SvelteComponent
  import type { SvelteComponent } from 'svelte'
</script>

<script lang="ts">
  import type { RenderableTreeNode } from '@markdoc/markdoc'

  export let content: RenderableTreeNode
  export let components: ComponentsMap = {}
</script>

{#if content !== null && typeof content === 'object'}
  {#if Array.isArray(content)}
    {#each content as node}
      <svelte:self content={node} {components} />
    {/each}
  {:else}
    {@const { name, attributes = {}, children = [] } = content}
    {#if components[name]}
      {@const component = components[name]}
      {#if children.length === 0}
        <svelte:component this={component} {...attributes} />
      {:else}
        <svelte:component this={component} {...attributes}>
          {#each children as child}
            {#if typeof child === 'string'}
              {child}
            {:else}
              <svelte:self content={child} {components} />
            {/if}
          {/each}
        </svelte:component>
      {/if}
    {:else if children.length === 0}
      <svelte:element this={name} {...attributes} />
    {:else}
      <svelte:element this={name} {...attributes}>
        {#each children as child}
          {#if typeof child === 'string'}
            {child}
          {:else}
            <svelte:self content={child} {components} />
          {/if}
        {/each}
      </svelte:element>
    {/if}
  {/if}
{/if}
