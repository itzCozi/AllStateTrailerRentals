<script lang="ts">
  import { onMount } from 'svelte';
  export let date: string = '';
  export let time: string = '';
  export let required = false;
  export let minDate: string = '';

  function toLocalDateString(d: Date) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  let effectiveMinDate: string = minDate || '';
  onMount(() => {
    if (!effectiveMinDate) {
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      effectiveMinDate = toLocalDateString(tomorrow);
    }
  });
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
  <input class="h-10 rounded-md border border-input bg-background px-3 text-sm" type="date" bind:value={date} {required} min={effectiveMinDate} />
  <input class="h-10 rounded-md border border-input bg-background px-3 text-sm" type="time" bind:value={time} {required} />
</div>
