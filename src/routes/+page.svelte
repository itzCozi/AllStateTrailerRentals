<script lang="ts">
  import Button from '$components/ui/button.svelte';
</script>

<section class="border-b bg-gradient-to-b from-white to-slate-50">
  <div class="container grid gap-8 py-16 md:grid-cols-2 md:py-24">
    <div class="flex flex-col justify-center gap-6">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">All State Trailer Rentals</h1>
      <p class="text-muted-foreground text-lg">Dump trailer, car hauler, and RV rentals serving North Carolina and South Carolina. Book online in minutes.</p>
      <div class="flex gap-4">
        <Button href="/booking" size="lg">Book Now</Button>
        <Button href="#fleet" variant="outline" size="lg">View Fleet</Button>
      </div>
      <ul class="mt-2 grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-3">
        <li>Same-day pickup</li>
        <li>Flexible scheduling</li>
        <li>NC & SC coverage</li>
      </ul>
    </div>
    <div class="aspect-video rounded-xl border bg-white shadow-sm"></div>
  </div>
  </section>

<section id="fleet" class="container py-16">
  <h2 class="mb-8 text-2xl font-semibold">Our Fleet</h2>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each [
      { title: 'Dump Trailer', desc: 'Perfect for cleanups and hauling.', cta: '/booking?type=dump' },
      { title: 'Car Hauler', desc: 'Two 16-18ft car haulers available.', cta: '/booking?type=car-hauler' },
      { title: 'RV', desc: 'Two RVs for weekend getaways.', cta: '/booking?type=rv' }
    ] as item}
      <div class="rounded-lg border bg-white p-5 shadow-sm">
        <div class="aspect-video rounded-md bg-slate-100"></div>
        <h3 class="mt-4 font-semibold">{item.title}</h3>
        <p class="text-muted-foreground text-sm">{item.desc}</p>
        <div class="mt-4">
          <Button href={item.cta} variant="secondary">Reserve</Button>
        </div>
      </div>
    {/each}
  </div>
</section>

<section id="contact" class="border-t bg-white">
  <div class="container py-16">
    <h2 class="mb-4 text-2xl font-semibold">Questions?</h2>
    <p class="text-muted-foreground">Call or text us to check availability and get a quote for NC & SC.</p>
    <div class="mt-4 flex flex-wrap items-center gap-4 text-sm">
      <a class="underline" href="tel:+1">Phone</a>
      <a class="underline" href="mailto:rentals@example.com">Email</a>
    </div>
  </div>
</section>
