<script lang="ts">
  export let type = 'text';
  export let value: string | number | undefined = undefined;
  export let placeholder = '';
  export let required = false;
  export let name: string | undefined = undefined;
  export let min: string | number | undefined = undefined;
  export let max: string | number | undefined = undefined;
  export let step: string | number | undefined = undefined;
</script>

<input
  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  {type}
  bind:value
  {placeholder}
  {required}
  {name}
  {min}
  {max}
  {step}
/>
