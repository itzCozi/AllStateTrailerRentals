<script lang="ts">
  export let date: string = '';
  export let time: string = '';
  export let required = false;
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
  <input class="h-10 rounded-md border border-input bg-background px-3 text-sm" type="date" bind:value={date} {required} />
  <input class="h-10 rounded-md border border-input bg-background px-3 text-sm" type="time" bind:value={time} {required} />
</div>
