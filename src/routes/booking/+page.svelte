<script lang="ts">
  import Button from '$components/ui/button.svelte';
  import Input from '$components/ui/input.svelte';
  import Label from '$components/ui/label.svelte';
  import Select from '$components/ui/select.svelte';
  import DateTime from '$components/ui/datetime.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let name = '';
  let email = '';
  let phone = '';
  let type = 'dump';
  let date = '';
  let time = '';
  let notes = '';
  const items = [
    { value: 'dump', label: 'Dump Trailer' },
    { value: 'car-hauler', label: 'Car Hauler' },
    { value: 'rv', label: 'RV' }
  ];

  $: type = $page.url.searchParams.get('type') ?? type;

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const res = await fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, type, date, time, notes })
    });
    if (res.ok) {
      location.href = '/booking/success';
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data?.error ?? 'Something went wrong.');
    }
  }
</script>

<section class="container py-12">
  <h1 class="mb-6 text-3xl font-bold">Book a Trailer</h1>
  <form class="grid max-w-2xl gap-6" on:submit={submit}>
    <div class="grid gap-2">
      <Label forId="name">Name</Label>
      <Input name="name" bind:value={name} required placeholder="Your full name" />
    </div>

    <div class="grid gap-2 sm:grid-cols-2">
      <div>
        <Label forId="email">Email</Label>
        <Input type="email" name="email" bind:value={email} required placeholder="you@example.com" />
      </div>
      <div>
        <Label forId="phone">Phone</Label>
        <Input type="tel" name="phone" bind:value={phone} required placeholder="(555) 555-5555" />
      </div>
    </div>

    <div class="grid gap-2">
      <Label forId="type">Trailer Type</Label>
      <Select name="type" bind:bindValue={type} {items} />
    </div>

    <div class="grid gap-2">
      <Label forId="datetime">Pickup Date & Time</Label>
      <DateTime bind:date bind:time required />
    </div>

    <div class="grid gap-2">
      <Label forId="notes">Notes</Label>
      <textarea class="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm" name="notes" bind:value={notes} placeholder="Anything we should know?"></textarea>
    </div>

    <Button type="submit" size="lg">Reserve</Button>
  </form>
</section>
