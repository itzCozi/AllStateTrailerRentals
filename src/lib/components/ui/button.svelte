<script lang="ts">
  export let variant: 'default' | 'secondary' | 'outline' | 'ghost' = 'default';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let disabled = false;

  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:opacity-95',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  } as const;
  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4', lg: 'h-11 px-6 text-base' } as const;
</script>

{#if href}
  <a href={href} class={`${base} ${variants[variant]} ${sizes[size]}`} aria-disabled={disabled}><slot /></a>
{:else}
  <button type={type} class={`${base} ${variants[variant]} ${sizes[size]}`} disabled={disabled}><slot /></button>
{/if}
