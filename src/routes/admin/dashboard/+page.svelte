<script lang="ts">
  export let data: { admin: { id: number; email: string }, bookings: Array<{ id: number; name: string; email: string; phone: string; type: string; date: string; time: string; notes?: string; created_at: string; }> };
</script>

<section class="container py-10">
  <div class="mb-6 flex items-center justify-between">
    <h1 class="text-3xl font-bold">Bookings</h1>
    <form method="POST" action="/admin/logout">
      <button class="rounded bg-red-600 px-3 py-2 text-white">Logout</button>
    </form>
  </div>

  <div class="overflow-auto rounded border">
    <table class="min-w-[800px] w-full text-sm">
      <thead class="bg-gray-50">
        <tr>
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
        {#if data.bookings.length === 0}
          <tr><td class="px-3 py-4" colspan="7">No bookings yet.</td></tr>
        {:else}
          {#each data.bookings as b}
            <tr class="border-t">
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
              <td class="px-3 py-2">{b.type}</td>
              <td class="px-3 py-2">{b.date} {b.time}</td>
              <td class="px-3 py-2 max-w-[280px] truncate" title={b.notes}>{b.notes}</td>
              <td class="px-3 py-2 text-xs text-gray-500">{b.created_at}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</section>