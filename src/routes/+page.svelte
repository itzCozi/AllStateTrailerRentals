<script lang="ts">
  import Button from '$components/ui/button.svelte';
  import Carousel from '$components/ui/carousel.svelte';
  import Modal from '$components/ui/modal.svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { rvVariants } from '$lib/data/vehicles';
  
  type TrailerKey = 'dump' | 'carHauler' | 'rv';

  type TrailerVariant = {
    label: string;
    name: string;
    images: string[];
    specs: Record<string, string | number>;
    notes?: string[];
  };

  const vehicleImages: Record<TrailerKey, string[]> = {
    dump: [
      '/DUMP1.jpg',
      '/DUMP2.jpg',
    ],
    carHauler: [
      '/CAR1.jpg',
      '/CAR2.jpg',
    ],
    rv: [
      '/RV1.jpg',
      '/RV2.jpg',
      '/RV3.jpg',
      '/RV4.jpg',
      '/RV5.jpg',
      '/RV6.jpg',
      '/RV7.jpg',
      '/RV8.jpg',
      '/RV9.jpg',
      '/RV10.jpg',
      '/RV11.jpg',
      '/RV12.jpg',
      '/RV13.jpg',
      '/RV14.jpg',
      '/RV15.jpg',
      '/RV16.jpg',
      '/RV17.jpg',
      '/RV18.jpg',
      '/RV19.jpg',
    ]
  };

  type Trailer = {
    key: TrailerKey;
    title: string;
    desc: string;
    cta: string;
    images: string[];
    specs: Record<string, string | number>;
    notes?: string[];
    variants?: TrailerVariant[];
  };

  const trailers: Trailer[] = [
    {
      key: 'dump',
      title: 'Dump Trailer',
      desc: 'Perfect for cleanups and hauling.',
      cta: '/booking?type=dump',
      images: vehicleImages.dump,
      specs: {
        'Type': '7x14 Tandem Axle Dump',
        'Empty Weight': '3,500 lbs (approx)',
        'Payload Capacity': '10,000 – 11,000 lbs',
        'GVWR': '14,000 lbs',
        'Hitch': '2-5/16" Ball',
        'Brakes': 'Electric (both axles)'
      },
      notes: [
        'Great for yard debris, junk removal, and construction materials.',
        'Ratchet straps available upon request.'
      ]
    },
    {
      key: 'carHauler',
      title: 'Car Hauler',
      desc: 'Two 16-18ft car haulers available.',
      cta: '/booking?type=car-hauler',
      images: vehicleImages.carHauler,
      specs: {
        'Deck Length': '16–18 ft',
        'Empty Weight': '1,900–2,200 lbs (approx)',
        'Payload Capacity': '6,000–7,000 lbs',
        'GVWR': '7,000 lbs',
        'Hitch': '2-5/16" Ball',
        'Brakes': 'Electric'
      },
      notes: [
        'Ideal for transporting vehicles, UTVs, and equipment.',
        'Ramps included.'
      ]
    },
    {
      key: 'rv',
      title: 'RV',
      desc: 'Two RVs for weekend getaways.',
  cta: '/booking?type=rv',
      images: rvVariants[0].images,
      specs: {
        'Models': 'RV 1 & RV 2',
        'Sleeps': '4–8 (model dependent)',
        'Length': '20–27 ft',
        'Power': '30A shore power'
      },
      variants: rvVariants
    }
  ];

  let showDetails = false;
  let active: Trailer | null = null;
  let variantIndex = 0;

  let lightboxOpen = false;
  let lightboxImages: string[] = [];
  let lightboxIndex = 0;

  function openLightbox(images: string[], index: number) {
    lightboxImages = images;
    lightboxIndex = index;
    lightboxOpen = true;
  }
  function closeLightbox() {
    lightboxOpen = false;
  }
  function nextLightbox() {
    if (lightboxImages.length === 0) return;
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  }
  function prevLightbox() {
    if (lightboxImages.length === 0) return;
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  }

  function openDetails(t: Trailer) {
    active = t;
    variantIndex = 0;
    showDetails = true;
  }
  function closeDetails() {
    showDetails = false;
    active = null;
  }
</script>

<section class="border-b bg-gradient-to-b from-white to-slate-100/60">
  <div class="container grid gap-8 py-16 md:grid-cols-2 md:py-24">
    <div class="flex flex-col justify-center gap-6">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">All State Trailer Rentals</h1>
      <p class="text-muted-foreground text-lg">Dump trailer, car hauler, and RV rentals serving North Carolina and South Carolina. Book online in minutes.</p>
      <div class="flex gap-4">
        <Button href="/booking" size="lg">Book Now</Button>
        <Button href="#fleet" variant="outline" size="lg">View Fleet</Button>
      </div>
      <ul class="mt-2 hidden grid-cols-3 gap-3 text-sm text-muted-foreground sm:grid sm:grid-cols-3">
        <li>Same-day pickup</li>
        <li>Flexible scheduling</li>
        <li>NC & SC coverage</li>
      </ul>
    </div>
    <div class="aspect-video rounded-xl border bg-white shadow-sm"></div>
    <ul class="-mt-1 grid grid-cols-3 justify-items-center text-center gap-3 text-sm text-muted-foreground sm:hidden">
      <li>Same-day pickup</li>
      <li>Flexible scheduling</li>
      <li>NC & SC coverage</li>
    </ul>
  </div>
  </section>

<section id="fleet" class="container py-16">
  <h2 class="mb-8 text-2xl font-semibold">Our Fleet</h2>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each trailers as item}
      <div class="rounded-lg border bg-white p-5 shadow-sm">
        <Carousel images={item.images} on:expand={(e) => openLightbox(e.detail.images, e.detail.index)} />
        <h3 class="mt-4 font-semibold">{item.title}</h3>
        <p class="text-muted-foreground text-sm">{item.desc}</p>
        <div class="mt-4">
          <div class="flex items-center justify-between">
            {#if item.variants}
              <Button href={`${item.cta}&variant=${item.variants[variantIndex]?.label}`} variant="secondary">Reserve</Button>
            {:else}
              <Button href={item.cta} variant="secondary">Reserve</Button>
            {/if}
            <Button on:click={() => openDetails(item)} variant="outline">Details</Button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<Modal
  open={lightboxOpen}
  title="Image Preview"
  onClose={closeLightbox}
  maxWidth="lg"
  maxHeightVh={70}
  zIndex={70}
>
  {#if lightboxImages.length}
    <div class="flex flex-col gap-3">
      <div class="relative w-full overflow-hidden rounded-md bg-black/5">
        <img
          src={lightboxImages[lightboxIndex]}
          alt={`Image ${lightboxIndex + 1}`}
          class="mx-auto max-h-[60vh] w-auto max-w-full object-contain"
        />
        {#if lightboxImages.length > 1}
          <button
            class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow border hover:bg-white"
            aria-label="Previous image"
            on:click={prevLightbox}
          >
            <ChevronLeft size={22} />
          </button>
          <button
            class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow border hover:bg-white"
            aria-label="Next image"
            on:click={nextLightbox}
          >
            <ChevronRight size={22} />
          </button>
        {/if}
      </div>
      <div class="text-center text-sm text-muted-foreground">
        {lightboxIndex + 1} / {lightboxImages.length}
      </div>
    </div>
  {/if}
</Modal>

  <Modal
  open={showDetails}
  title={active ? `${active.title}${active.variants ? ` - ${active.variants[variantIndex]?.name}` : ''}` : undefined}
  onClose={closeDetails}
  maxWidth="xl"
>
  {#if active}
    <div class="grid gap-4 md:grid-cols-2">

      <div class="flex flex-col gap-6 items-center">
      {#if active.variants}
        {#key variantIndex}
          <Carousel images={active.variants[variantIndex].images} on:expand={(e) => openLightbox(e.detail.images, e.detail.index)} />
        {/key}
      {:else}
        <Carousel images={active.images} on:expand={(e) => openLightbox(e.detail.images, e.detail.index)} />
      {/if}
      {#if active.variants}
        <div class="md:col-span-2 flex items-center justify-between">
          <div class="inline-flex rounded-md border bg-slate-100 p-1 gap-1">
            {#each active.variants as v, i}
              <button
                class="px-3 py-1 text-sm rounded duration-200 {i === variantIndex ? 'bg-white shadow font-medium' : 'hover:bg-white/60'}"
                aria-pressed={i === variantIndex}
                on:click={() => (variantIndex = i)}
              >{i + 1}</button>
            {/each}
          </div>
        </div>
      {/if}
      </div>
      <div class="space-y-4">
        <div>
          <h4 class="font-semibold">Overview</h4>
          <p class="text-sm text-muted-foreground">{active.desc}</p>
        </div>
        <div>
          <h4 class="font-semibold">Specifications</h4>
          <ul class="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {#if active.variants}
              {#each Object.entries(active.variants[variantIndex].specs) as [k, v]}
                <li class="flex items-start justify-between gap-4 rounded border p-2">
                  <span>{k}</span>
                  <span class="font-medium">{v}</span>
                </li>
              {/each}
            {:else}
              {#each Object.entries(active.specs) as [k, v]}
                <li class="flex items-start justify-between gap-4 rounded border p-2">
                  <span>{k}</span>
                  <span class="font-medium">{v}</span>
                </li>
              {/each}
            {/if}
          </ul>
        </div>
        {#if active.variants}
          {#if active.variants[variantIndex].notes?.length}
            <div>
              <h4 class="font-semibold">Notes</h4>
              <ul class="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                {#each active.variants[variantIndex].notes as n}
                  <li>{n}</li>
                {/each}
              </ul>
            </div>
          {/if}
        {:else if active.notes?.length}
          <div>
            <h4 class="font-semibold">Notes</h4>
            <ul class="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              {#each active.notes as n}
                <li>{n}</li>
              {/each}
            </ul>
          </div>
        {/if}
        <div class="pt-2">
          {#if active.variants}
            <Button href={`${active.cta}&variant=${active.variants[variantIndex].label}`} size="full">Reserve {active.variants[variantIndex].label}</Button>
          {:else}
            <Button href={active.cta} size="full">Reserve</Button>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</Modal>

<section id="contact" class="border-t bg-white">
  <div class="container py-16">
    <h2 class="mb-4 text-2xl font-semibold">Questions?</h2>
    <p class="text-muted-foreground">Call or text us to check availability and get a quote for NC & SC.</p>
    <div class="mt-4 flex flex-wrap items-center gap-4 text-sm">
      <a class="underline" href="tel:+1">Phone</a>
      <a class="underline" href="mailto:allstatetrailerrentals@gmail.com">Email</a>
    </div>
  </div>
</section>
