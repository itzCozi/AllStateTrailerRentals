<script lang="ts">
  export let href: string;
  export let disabled = false;

  const base = 'hover:underline';
</script>

<a href={href} class={`${base}`} aria-disabled={disabled}>
  <slot />
</a>
