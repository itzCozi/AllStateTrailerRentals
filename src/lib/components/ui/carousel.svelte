<script lang="ts">
  export let images: string[] = [];
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';
  
  let currentIndex = 0;
  const dispatch = createEventDispatcher<{ expand: { index: number; images: string[] } }>();
  
  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }
  
  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  
  function goToSlide(index: number) {
    currentIndex = index;
  }
</script>

<div class="relative aspect-video overflow-hidden rounded-md bg-slate-100">
  {#if images.length > 0}
    <button
      type="button"
      class="h-full w-full cursor-zoom-in"
      aria-label="Expand image"
      on:click={() => dispatch('expand', { index: currentIndex, images })}
    >
      <img 
        src={images[currentIndex]} 
        alt="Vehicle {currentIndex + 1}"
        class="h-full w-full object-cover"
      />
    </button>
    
    {#if images.length > 1}
      <button
        on:click={prev}
        class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition border duration-300 hover:bg-white/95"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        on:click={next}
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition border duration-300 hover:bg-white/95"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
      
      <div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
        {#each images as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="h-2 w-2 rounded-full transition {index === currentIndex ? 'bg-white' : 'bg-white/50'}"
            aria-label="Go to image {index + 1}"
          ></button>
        {/each}
      </div>
    {/if}
  {:else}
    <div class="flex h-full items-center justify-center text-slate-400">
      No images available
    </div>
  {/if}
</div>
