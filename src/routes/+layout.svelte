<script lang="ts">
  import '../app.css';
  // SEO defaults and global styles set here.
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="theme-color" content="#1d4ed8" />
  <meta name="description" content="All State Trailer Rentals - Dump trailers, car haulers, and RV rentals serving North Carolina and South Carolina. Book online." />
  <link rel="canonical" href="https://www.allstatetrailers.com" />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <header class="border-b bg-white/70 backdrop-blur">
    <div class="container flex h-16 items-center justify-between">
      <a href="/" class="flex items-center gap-2 font-semibold">
        <span class="text-lg">All State Trailer Rentals</span>
      </a>
      <nav class="flex items-center gap-6 text-sm">
        <a href="/" class="hover:text-primary">Home</a>
        <a href="/booking" class="hover:text-primary">Book</a>
        <a href="/#fleet" class="hover:text-primary">Fleet</a>
        <a href="/#contact" class="hover:text-primary">Contact</a>
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
        <a class="hover:text-primary" href="/sitemap.xml">Sitemap</a>
        <a class="hover:text-primary" href="/robots.txt">Robots</a>
      </div>
    </div>
  </footer>
</div>

<!-- global styles are imported via script so Tailwind gets processed by PostCSS -->
