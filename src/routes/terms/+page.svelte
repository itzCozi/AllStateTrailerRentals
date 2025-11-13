<script lang="ts">
  import Button from '$components/ui/button.svelte';
  import { page } from '$app/stores';
  export let data: { alreadyAccepted: boolean };
  import { onMount } from 'svelte';
  let accepted = false;
  let redirectTo = '/booking';

  onMount(() => {
    const r = $page.url.searchParams.get('redirect');
    if (r) redirectTo = r;
  });
</script>

<section class="container max-w-3xl py-12">
  <h1 class="mb-6 text-3xl font-bold">Terms and Conditions</h1>
  <div class="prose max-w-none">
    <p>
      Please read these Terms and Conditions carefully before reserving a trailer from AllState Trailer Rentals.
      By clicking “I agree” you acknowledge that you have read, understood, and agree to be bound by these Terms.
    </p>
    <h3>Reservations</h3>
    <ul>
      <li>Reservations are requests and are confirmed only after we contact you.</li>
      <li>You must provide accurate contact details and pickup date/time.</li>
    </ul>
    <h3>Driver and Vehicle Requirements</h3>
    <ul>
      <li>You must possess a valid driver’s license and appropriate tow vehicle.</li>
      <li>Renter is responsible for proper hitching and safe operation.</li>
    </ul>
    <h3>Liability</h3>
    <ul>
      <li>Renter assumes responsibility for any damage or citations during the rental period.</li>
      <li>All equipment must be returned in the condition received, subject to normal wear.</li>
    </ul>
    <h3>Cancellations and Changes</h3>
    <ul>
      <li>Please notify us as soon as possible to modify or cancel your reservation.</li>
      <li>Policies may vary by trailer type and availability.</li>
    </ul>
    <p class="text-sm text-muted-foreground">
      Note: This is a simplified policy overview. Additional terms may apply at time of pickup.
    </p>
  </div>

  {#if !data.alreadyAccepted}
    <form method="POST" action="?/agree" class="mt-8 grid gap-4">
      <input type="hidden" name="redirect" bind:value={redirectTo} />
      <label class="flex items-start gap-3">
        <input type="checkbox" name="accepted" bind:checked={accepted} class="mt-[3px]" />
        <span>I have read and agree to the Terms and Conditions.</span>
      </label>
      <div class="flex gap-3">
        <Button type="submit" size="lg" disabled={!accepted}>I agree</Button>
        <Button variant="outline" size="lg" href={redirectTo}>Go back</Button>
      </div>
    </form>
  {:else}
    <div class="mt-8">
      <Button variant="outline" size="lg" href={redirectTo}>Go back</Button>
    </div>
  {/if}
</section>
