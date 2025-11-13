<script lang="ts">
  export let open = false;
  export let title: string | undefined = undefined;
  export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  export let closeOnOverlay = true;
  export let onClose: (() => void) | undefined;
  export let transitionDuration: number = 150;

  import { fade, scale } from 'svelte/transition';
  import { X } from 'lucide-svelte';

  function escAction(node: HTMLElement) {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        e.stopPropagation();
        onClose?.();
      }
    };
    if (typeof window !== 'undefined' && window.addEventListener) {
      window.addEventListener('keydown', onKey, true);
    }
    return {
      destroy() {
        if (typeof window !== 'undefined' && window.removeEventListener) {
          window.removeEventListener('keydown', onKey, true);
        }
      }
    };
  }
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50" on:click={() => closeOnOverlay && onClose?.()} aria-hidden="true" transition:fade={{ duration: transitionDuration }}></div>
    <div
      use:escAction
      role="dialog"
      aria-modal="true"
      aria-label={title}
      class={`relative z-10 w-full ${maxWidth === 'sm' ? 'max-w-sm' : maxWidth === 'md' ? 'max-w-md' : maxWidth === 'lg' ? 'max-w-2xl' : 'max-w-4xl'} overflow-hidden rounded-lg border bg-white shadow-xl`}
      transition:scale={{ duration: transitionDuration, start: 0.96, opacity: 0.9 }}
    >
      <div class="flex items-center justify-between border-b p-4">
        <h3 class="text-lg font-semibold">{title}</h3>
        <button class="rounded-md p-1 duration-300 hover:bg-slate-100" aria-label="Close" on:click={() => onClose?.()}>
          <X size={25} />
        </button>
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
{/if}
