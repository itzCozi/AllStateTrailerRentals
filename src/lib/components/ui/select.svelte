<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let items: { value: string; label: string }[] = [];
  export let name: string | undefined = undefined;
  export let bindValue: string | undefined = undefined;
  export let required = false;

  let open = false;
  let highlightedIndex = -1;
  let container: HTMLDivElement | null = null;
  const listboxId = `select-listbox-${Math.random().toString(36).slice(2)}`;

  const selectedIndex = () => Math.max(0, items.findIndex((i) => i.value === bindValue));
  function selectedItem(): { value: string; label: string } | undefined {
    return items.find((i) => i.value === bindValue) ?? items[0];
  }
  let selectedItemLabel: string | undefined;
  $: selectedItemLabel = (items.find((i) => i.value === bindValue) ?? items[0])?.label;

  function toggle() {
    open = !open;
    if (open) {
      highlightedIndex = selectedIndex();
    }
  }

  function selectAt(index: number) {
    if (index >= 0 && index < items.length) {
      const item = items[index];
      bindValue = item.value;
      open = false;
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      open = true;
      highlightedIndex = selectedIndex();
      return;
    }
    if (!open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      open = false;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = Math.min(items.length - 1, (highlightedIndex < 0 ? -1 : highlightedIndex) + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = Math.max(0, (highlightedIndex < 0 ? 0 : highlightedIndex) - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectAt(highlightedIndex >= 0 ? highlightedIndex : selectedIndex());
    }
  }

  let removeListener: (() => void) | null = null;
  onMount(() => {
    const handler = (e: MouseEvent) => {
      if (open && container && e.target instanceof Node && !container.contains(e.target)) {
        open = false;
      }
    };
    document.addEventListener('mousedown', handler, true);
    removeListener = () => document.removeEventListener('mousedown', handler, true);
    return () => removeListener?.();
  });
</script>

<div class="relative" bind:this={container}>
  <!-- Preserve form submission -->
  {#if name}
    <input type="hidden" {name} value={bindValue ?? selectedItem()?.value ?? ''} {required} />
  {/if}

  <button
    type="button"
    role="combobox"
    aria-expanded={open}
    aria-controls={listboxId}
    aria-activedescendant={open && highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined}
    aria-haspopup="listbox"
    class="h-10 w-full rounded-md border border-input bg-background px-3 text-sm flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-ring"
    on:click={toggle}
    on:keydown={onKeyDown}
  >
  <span>{selectedItemLabel ?? 'Select...'}</span>
    <!-- Chevron -->
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 opacity-70">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </button>

  {#if open}
    <ul
      role="listbox"
      id={listboxId}
      class="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md overflow-auto max-h-60"
      transition:fade={{ duration: 120 }}
    >
      {#each items as item, i}
        <li
          role="option"
          aria-selected={item.value === bindValue}
          id={`${listboxId}-option-${i}`}
          class={`cursor-pointer select-none px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none flex items-center justify-between ${i === highlightedIndex ? 'bg-accent/40' : ''}`}
          tabindex="-1"
          on:click={() => selectAt(i)}
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectAt(i); } }}
          on:mouseenter={() => (highlightedIndex = i)}
        >
          <span class={`truncate ${i === highlightedIndex ? 'font-medium' : ''}`}>{item.label}</span>
          {#if item.value === bindValue}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>
