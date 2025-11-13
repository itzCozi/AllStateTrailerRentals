<script lang="ts">
  import '../app.css';
  import Link from '$lib/components/ui/link.svelte';
  import { page } from '$app/stores';
  
  export let data: {
    siteName: string;
    origin: string;
    path: string;
    canonical: string;
    seo?: { title?: string; description?: string; image?: string | null };
  };

  $: currentSeo = {
    title: $page.data?.seo?.title ?? data.seo?.title ?? 'All State Trailer Rentals',
    description: $page.data?.seo?.description ?? data.seo?.description ?? 'Dump trailers, car haulers, and RV rentals serving NC & SC. Book online.',
    image: $page.data?.seo?.image ?? data.seo?.image ?? null
  };
  $: canonical = ($page.data?.canonical ?? data.canonical) as string;
  $: ogUrl = data.origin + $page.url.pathname;
  $: siteName = data.siteName;
  $: jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    url: data.origin,
    description: currentSeo.description,
    areaServed: ['North Carolina', 'South Carolina']
  };
  $: jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: data.origin + '/' },
      $page.url.pathname.startsWith('/booking') ? { '@type': 'ListItem', position: 2, name: 'Booking', item: data.origin + '/booking' } : null
    ].filter(Boolean)
  };
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="/favicon.png" sizes="any" />
  <link rel="apple-touch-icon" href="/large.png" />
  <meta name="theme-color" content="#1d4ed8" />

  <title>{currentSeo.title}</title>
  <meta name="description" content={currentSeo.description} />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={currentSeo.title} />
  <meta property="og:description" content={currentSeo.description} />
  <meta property="og:url" content={ogUrl} />
  {#if currentSeo.image}
    <meta property="og:image" content={currentSeo.image} />
    <meta property="og:image:alt" content={siteName} />
  {/if}
  <meta property="og:image" content={`${data.origin}/large.png`} />
  <meta property="og:image:alt" content={siteName} />
  <meta property="og:image" content={`${data.origin}/text.png`} />
  <meta property="og:image:alt" content={siteName} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={currentSeo.title} />
  <meta name="twitter:description" content={currentSeo.description} />
  <meta name="twitter:image" content={currentSeo.image ?? `${data.origin}/large.png`} />

  <script type="application/ld+json">{JSON.stringify(jsonLdOrg)}</script>
  {#if $page.url.pathname === '/' || $page.url.pathname.startsWith('/booking')}
    <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
  {/if}
</svelte:head>

<div class="min-h-screen flex flex-col">
  <header class="border-b bg-white/70 backdrop-blur">
    <div class="container flex h-16 items-center justify-between">
      <a href="/" class="flex items-center gap-2 font-semibold">
        <img src="/text.png" alt={siteName} class="h-10 sm:h-12 w-auto" />
      </a>
      <nav class="flex items-center gap-6 text-sm">
        <Link href="/booking">Book</Link>
        <Link href="/#fleet">Fleet</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </div>
  </header>
  <main class="flex-1">
    <slot />
  </main>
  <footer class="border-t py-8 text-sm">
    <div class="container flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-muted-foreground">© {new Date().getFullYear()} All State Trailer Rentals. Serving NC & SC.</p>
      <div class="flex gap-4">
        <Link href="/sitemap.xml">Sitemap</Link>
        <Link href="/robots.txt">Robots</Link>
      </div>
    </div>
  </footer>
</div>
