<script lang="ts">
  export let variant: 'default' | 'secondary' | 'outline' | 'ghost' = 'default';
  export let size: 'sm' | 'md' | 'lg' | 'full' | 'w-full' = 'md';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string | undefined = undefined;
  export let disabled = false;

  const base = 'inline-flex items-center justify-center rounded-md font-medium disabled:opacity-50 disabled:pointer-events-none ring-offset-background duration-200 shadow hover:shadow-lg';
  const variants = {
    default: 'bg-primary text-primary-foreground border hover:opacity-95',
    secondary: 'bg-secondary text-secondary-foreground border hover:bg-secondary/50',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground'
  } as const;
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-6 text-base',
    full: 'w-full h-10 px-4',
    'w-full': 'w-full h-10 px-4'
  } as const;
</script>

{#if href}
  <a href={href} class={`${base} ${variants[variant]} ${sizes[size]}`} aria-disabled={disabled} on:click {...$$restProps}><slot /></a>
{:else}
  <button type={type} class={`${base} ${variants[variant]} ${sizes[size]}`} disabled={disabled} on:click {...$$restProps}><slot /></button>
{/if}
