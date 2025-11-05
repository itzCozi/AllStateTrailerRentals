<script lang="ts">
  export let items: { value: string; label: string }[] = [];
  export let name: string | undefined = undefined;
  export let bindValue: string | undefined = undefined;
  export let required = false;
</script>

<select
  class="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  {name}
  bind:value={bindValue}
  {required}
>
  {#each items as item}
    <option value={item.value}>{item.label}</option>
  {/each}
</select>
