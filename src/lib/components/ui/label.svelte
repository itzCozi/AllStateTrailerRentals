<script lang="ts">
  export let forId: string | undefined;
  export let className = '';
</script>

<label class={`text-sm font-medium leading-none ${className}`} for={forId}>
  <slot />
</label>
