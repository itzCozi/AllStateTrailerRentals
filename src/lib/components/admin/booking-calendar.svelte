<script lang="ts">
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';

  type Booking = {
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
  };
  const dispatch = createEventDispatcher<{ daySelect: { date: string; bookings: Booking[] } }>();
  export let bookings: Array<Booking> = [];

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

  $: byDate = bookings.reduce<Record<string, Booking[]>>((acc, b) => {
    const k = (() => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return b.date;
      const parsed = new Date(b.date);
      if (isNaN(parsed.getTime())) return b.date;
      const mm = String(parsed.getMonth() + 1).padStart(2, '0');
      const dd = String(parsed.getDate()).padStart(2, '0');
      return `${parsed.getFullYear()}-${mm}-${dd}`;
    })();
    (acc[k] ||= []).push(b);
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

  function goToThisMonth() {
    month = today.getMonth();
    year = today.getFullYear();
  }

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  $: start = firstDayOfMonth(year, month);
  $: dim = daysInMonth(year, month);
  $: totalCells = start + dim;
  $: trailing = 42 - totalCells;
</script>

<div class="rounded-lg border p-4">
  <div class="mb-3 flex items-center justify-between">
    <button class="rounded border p-2 inline-flex items-center justify-center" on:click={prevMonth} aria-label="Previous month">
      <ChevronLeft class="h-4 w-4" aria-hidden="true" />
    </button>
    <div class="text-lg font-semibold">{monthNames[month]} {year}</div>
    <button class="rounded border p-2 inline-flex items-center justify-center" on:click={nextMonth} aria-label="Next month">
      <ChevronRight class="h-4 w-4" aria-hidden="true" />
    </button>
  </div>

  <div class="grid grid-cols-7 gap-1 text-xs text-gray-600">
    {#each weekdayNames as w}
      <div class="px-2 py-1 text-center font-medium">{w}</div>
    {/each}
  </div>

  <div class="mt-1 grid grid-cols-7 gap-1">
    {#each Array(start).fill(0) as _}
      <div class="h-24 rounded bg-transparent"></div>
    {/each}
    {#each Array(dim) as _, i}
      {@const day = i + 1}
      {@const key = toKey(year, month, day)}
      {@const cnt = counts[key] || 0}
      <div class="h-24 rounded border p-1 flex flex-col">
        <div class="text-[10px] text-gray-500">{day}</div>
        {#if cnt > 0}
          <div class="mt-auto">
            <button
              class="inline-flex items-center rounded bg-emerald-100 px-1.5 py-1 text-[10px] duration-200 font-medium text-emerald-800 hover:bg-emerald-200/60"
              on:click={() => dispatch('daySelect', { date: key, bookings: byDate[key] || [] })}
              aria-label={`View ${cnt} booking${cnt > 1 ? 's' : ''} on ${key}`}
            >
              {cnt} booking{cnt > 1 ? 's' : ''}
            </button>
          </div>
        {/if}
      </div>
    {/each}
    {#if trailing > 0}
      {#each Array(trailing).fill(0) as _}
        <div class="h-24 rounded bg-transparent"></div>
      {/each}
    {/if}
  </div>

  <div class="mt-4 text-xs text-gray-600 flex items-center justify-between">
    <div>Total bookings shown: {bookings.length}</div>
    <button
      class="inline-flex items-center gap-1 duration-200 rounded border px-2 py-1 text-gray-700 hover:bg-gray-100"
      on:click={goToThisMonth}
      aria-label="Jump to current month"
    >
      This month
    </button>
  </div>
</div>
