<script lang="ts">
  import Modal from "$lib/components/ui/modal.svelte";
  import Button from "$lib/components/ui/button.svelte";
  import Link from "$lib/components/ui/link.svelte";
  import BookingCalendar from "$lib/components/admin/booking-calendar.svelte";

  export let data: { admin: { id: number; email: string }, bookings: Array<{ id: number; name: string; email: string; phone: string; type: string; variant?: string; date: string; time: string; notes?: string; created_at: string; }> };

  let bookings = [...data.bookings];
  let selected = new Set<number>();
  let selectAll = false;

  let detailOpen = false;
  let active: typeof bookings[number] | null = null;

  function toggleAll() {
    if (selectAll) {
      selected = new Set();
    } else {
      selected = new Set(bookings.map((b) => b.id));
    }
  }

  function toggleOne(id: number) {
    if (selected.has(id)) {
      const next = new Set(selected);
      next.delete(id);
      selected = next;
    } else {
      selected = new Set(selected).add(id);
    }
  }

  function openDetails(b: typeof bookings[number]) {
    active = b;
    detailOpen = true;
  }

  async function deleteByIds(ids: number[]) {
    if (!ids.length) return;
    if (!confirm(`Delete ${ids.length} booking${ids.length > 1 ? 's' : ''}? This cannot be undone.`)) return;
    try {
      const res = await fetch('/admin/api/bookings', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids })
      });
      if (!res.ok) {
        const t = await res.text();
        alert(`Failed to delete: ${t}`);
        return;
      }
      const j = await res.json();
      if (!j?.success) {
        alert('Failed to delete bookings');
        return;
      }
      const idSet = new Set(ids);
      bookings = bookings.filter((b) => !idSet.has(b.id));
      selected = new Set(Array.from(selected).filter((id) => !idSet.has(id)));
      selectAll = selected.size === bookings.length && bookings.length > 0;
      if (active && idSet.has(active.id)) {
        detailOpen = false;
        active = null;
      }
    } catch (e) {
      alert('Network error while deleting');
    }
  }

  function onRowClick(e: MouseEvent, b: typeof bookings[number]) {
    const target = e.target as HTMLElement;
    if (target.closest('a,button,input,label,svg,[role="button"]')) return;
    openDetails(b);
  }

  $: selectedCount = selected.size;
  $: hasSelection = selectedCount > 0;
  $: noneLeft = bookings.length === 0;
  $: selectAll = bookings.length > 0 && selected.size === bookings.length;
  
</script>

<section class="container py-10">
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-3xl font-bold">Bookings</h1>
    <Link href="/admin/logout">Logout</Link>
  </div>

  <div class="mb-3 flex items-center justify-between">
    <div class="text-sm text-gray-600">{bookings.length} total · {selectedCount} selected</div>
    <div class="space-x-2">
      <Button variant="secondary" on:click={() => deleteByIds(Array.from(selected))} disabled={!hasSelection}>Delete Selected</Button>
    </div>
  </div>

  <div class="overflow-auto rounded-lg border">
    <table class="min-w-[800px] w-full text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-3 py-2 text-left"><input type="checkbox" checked={selectAll} on:change={toggleAll} aria-label="Select all" /></th>
          <th class="px-3 py-2 text-left">#</th>
          <th class="px-3 py-2 text-left">Customer</th>
          <th class="px-3 py-2 text-left">Contact</th>
          <th class="px-3 py-2 text-left">Type</th>
          <th class="px-3 py-2 text-left">Pickup</th>
          <th class="px-3 py-2 text-left">Notes</th>
          <th class="px-3 py-2 text-left">Created</th>
        </tr>
      </thead>
      <tbody>
        {#if noneLeft}
          <tr><td class="px-3 py-4" colspan="8">No bookings yet.</td></tr>
        {:else}
          {#each bookings as b}
            <tr class="border-t hover:bg-gray-50 cursor-pointer" on:click={(e) => onRowClick(e, b)}>
              <td class="px-3 py-2" on:click|stopPropagation>
                <input type="checkbox" checked={selected.has(b.id)} on:change={() => toggleOne(b.id)} aria-label={`Select booking ${b.id}`} />
              </td>
              <td class="px-3 py-2">{b.id}</td>
              <td class="px-3 py-2">
                <div class="font-medium">{b.name}</div>
                <div class="text-xs text-gray-500">{b.email} · {b.phone}</div>
              </td>
              <td class="px-3 py-2 space-x-2 whitespace-nowrap">
                <a class="underline" href={`mailto:${b.email}`}>Email</a>
                <a class="underline" href={`tel:${b.phone}`}>Call</a>
                <a class="underline" href={`sms:${b.phone}`}>Text</a>
              </td>
              <td class="px-3 py-2">{b.type}{b.variant ? ` • ${b.variant}` : ''}</td>
              <td class="px-3 py-2">{b.date} {b.time}</td>
              <td class="px-3 py-2 max-w-[280px] truncate" title={b.notes}>{b.notes}</td>
              <td class="px-3 py-2 text-xs text-gray-500">{b.created_at}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <div class="mt-8">
    <h2 class="mb-3 text-xl font-semibold">Monthly calendar</h2>
    <BookingCalendar bookings={bookings} />
  </div>

  <Modal bind:open={detailOpen} title={active ? `Booking #${active.id}` : 'Booking'} onClose={() => (detailOpen = false)} maxWidth="md">
    {#if active}
      <div class="space-y-2 text-sm">
        <div class="grid grid-cols-3 gap-2">
          <div class="text-gray-500">Customer</div>
          <div class="col-span-2">{active.name}</div>

          <div class="text-gray-500">Email</div>
          <div class="col-span-2"><a href={`mailto:${active.email}`} class="underline">{active.email}</a></div>

          <div class="text-gray-500">Phone</div>
          <div class="col-span-2"><a href={`tel:${active.phone}`} class="underline">{active.phone}</a></div>

          <div class="text-gray-500">Type</div>
          <div class="col-span-2">{active.type}{active.variant ? ` • ${active.variant}` : ''}</div>

          <div class="text-gray-500">Pickup</div>
          <div class="col-span-2">{active.date} {active.time}</div>

          <div class="text-gray-500">Notes</div>
          <div class="col-span-2 whitespace-pre-wrap">{active.notes || '—'}</div>

          <div class="text-gray-500">Created</div>
          <div class="col-span-2">{active.created_at}</div>
        </div>
        <div class="pt-4 flex items-center justify-end gap-2">
          <button class="rounded bg-red-600 px-3 py-2 text-white" on:click={() => deleteByIds([active!.id])}>Delete</button>
          <button class="rounded border px-3 py-2" on:click={() => (detailOpen = false)}>Close</button>
        </div>
      </div>
    {/if}
  </Modal>
</section>