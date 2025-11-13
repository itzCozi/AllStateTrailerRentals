<script lang="ts">
  export let bookings: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
    variant?: string;
    date: string;
    time: string;
    notes?: string;
    created_at: string;
  }> = [];

  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  function daysInMonth(y: number, m: number) {
    return new Date(y, m + 1, 0).getDate();
  }

  function firstDayOfMonth(y: number, m: number) {
    return new Date(y, m, 1).getDay();
  }

  function toKey(y: number, m: number, d: number) {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  }

  $: counts = bookings.reduce<Record<string, number>>((acc, b) => {
    const k = (() => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return b.date;
      const parsed = new Date(b.date);
      if (isNaN(parsed.getTime())) return b.date;
      const mm = String(parsed.getMonth() + 1).padStart(2, '0');
      const dd = String(parsed.getDate()).padStart(2, '0');
      return `${parsed.getFullYear()}-${mm}-${dd}`;
    })();
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  function prevMonth() {
    if (month === 0) {
      month = 11;
      year -= 1;
    } else {
      month -= 1;
    }
  }

  function nextMonth() {
    if (month === 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    }
  }

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  $: start = firstDayOfMonth(year, month);
  $: dim = daysInMonth(year, month);
</script>

<div class="rounded-lg border p-4">
  <div class="mb-3 flex items-center justify-between">
    <button class="rounded border px-2 py-1" on:click={prevMonth} aria-label="Previous month">‹</button>
    <div class="text-lg font-semibold">{monthNames[month]} {year}</div>
    <button class="rounded border px-2 py-1" on:click={nextMonth} aria-label="Next month">›</button>
  </div>

  <div class="grid grid-cols-7 gap-1 text-xs text-gray-600">
    {#each weekdayNames as w}
      <div class="px-2 py-1 text-center font-medium">{w}</div>
    {/each}
  </div>

  <div class="mt-1 grid grid-cols-7 gap-1">
    {#each Array(start).fill(0) as _}
      <div class="h-16 rounded bg-transparent"></div>
    {/each}
    {#each Array(dim) as _, i}
      {@const day = i + 1}
      {@const key = toKey(year, month, day)}
      {@const cnt = counts[key] || 0}
      <div class="h-16 rounded border p-1 flex flex-col">
        <div class="text-[10px] text-gray-500">{day}</div>
        {#if cnt > 0}
          <div class="mt-auto">
            <span class="inline-flex items-center rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800">{cnt} booking{cnt > 1 ? 's' : ''}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="mt-4 text-xs text-gray-600">
    <div>Total bookings shown: {bookings.length}</div>
  </div>
</div>

<style>
  /* Keep styles minimal; Tailwind handles most visuals */
</style>
