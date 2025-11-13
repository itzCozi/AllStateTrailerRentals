<script lang="ts">
  import { enhance } from '$app/forms';
  export let data: { admin: { id: number; email: string } | null };
  let loginError = '';
  let registerError = '';
  let registerSuccess = false;
  let loginSuccess = false;
  let mode: 'login' | 'register' | 'forgot' = 'login';

  function onLoginEnhance() {
    return async ({ result, update }: any) => {
      if (result.type === 'success') {
        const r: any = result.data;
        loginSuccess = r.success;
        loginError = r.success ? '' : r.message;
        if (r.success) location.href = '/admin/dashboard';
      }
      await update?.();
    };
  }

  function onRegisterEnhance() {
    return async ({ result, update }: any) => {
      if (result.type === 'success') {
        const r: any = result.data;
        registerSuccess = r.success;
        registerError = r.success ? '' : r.message;
      }
      await update?.();
    };
  }

  function onResetEnhance() {
    return async ({ result, update }: any) => {
      if (result.type === 'success') {
        const r: any = result.data;
        if (r.success) {
          mode = 'login';
        } else {
          registerError = r.message || 'Reset failed';
        }
      }
      await update?.();
    };
  }
</script>

<section class="container py-10 max-w-3xl">
  {#if data.admin}
    <div class="space-y-4 text-center mx-auto max-w-md">
      <p>Logged in as {data.admin.email}</p>
      <a href="/admin/dashboard" class="inline-block rounded bg-primary px-4 py-2 text-primary-foreground mx-auto">Go to Dashboard</a>
    </div>
  {:else}
    <div class="max-w-md mx-auto space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl">{mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset Password'}</h2>
        <div class="space-x-3">
          {#if mode !== 'login'}
            <button type="button" class="text-sm underline" on:click={() => { mode = 'login'; loginError=''; registerError=''; registerSuccess=false; }}>Login</button>
          {/if}
          {#if mode !== 'register'}
            <button type="button" class="text-sm underline" on:click={() => { mode = 'register'; loginError=''; registerError=''; registerSuccess=false; }}>Register</button>
          {/if}
          {#if mode !== 'forgot'}
            <button type="button" class="text-sm underline" on:click={() => { mode = 'forgot'; loginError=''; registerError=''; registerSuccess=false; }}>Forgot password</button>
          {/if}
        </div>
      </div>
      {#if mode === 'login'}
        <form method="POST" action="?/login" use:enhance={onLoginEnhance} class="space-y-4 p-4 border rounded">
          <div>
            <label class="block mb-1 text-sm" for="login-email">Email</label>
            <input id="login-email" name="email" type="email" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block mb-1 text-sm" for="login-password">Password</label>
            <input id="login-password" name="password" type="password" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          {#if loginError}<p class="text-sm text-red-600">{loginError}</p>{/if}
          <button type="submit" class="rounded bg-primary px-4 py-2 text-primary-foreground w-full">Login</button>
        </form>
      {:else if mode === 'register'}
        <form method="POST" action="?/register" use:enhance={onRegisterEnhance} class="space-y-4 p-4 border rounded">
          <div>
            <label class="block mb-1 text-sm" for="reg-email">Email</label>
            <input id="reg-email" name="email" type="email" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block mb-1 text-sm" for="reg-password">Password</label>
            <input id="reg-password" name="password" type="password" minlength="8" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block mb-1 text-sm" for="reg-key">Registration Key</label>
            <input id="reg-key" name="key" type="text" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          {#if registerError}<p class="text-sm text-red-600">{registerError}</p>{/if}
          {#if registerSuccess}<p class="text-sm">Registered! You may now login.</p>{/if}
          <button type="submit" class="rounded bg-primary px-4 py-2 text-primary-foreground w-full">Register</button>
        </form>
      {:else}
        <form method="POST" action="?/reset" use:enhance={onResetEnhance} class="space-y-4 p-4 border rounded">
          <div>
            <label class="block mb-1 text-sm" for="reset-email">Email</label>
            <input id="reset-email" name="email" type="email" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block mb-1 text-sm" for="reset-password">New Password</label>
            <input id="reset-password" name="password" type="password" minlength="8" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block mb-1 text-sm" for="reset-key">Registration Key</label>
            <input id="reset-key" name="key" type="text" required class="w-full rounded border px-3 py-2 text-sm" />
          </div>
          {#if registerError}<p class="text-sm text-red-600">{registerError}</p>{/if}
          <button type="submit" class="rounded bg-primary px-4 py-2 text-primary-foreground w-full">Reset Password</button>
        </form>
      {/if}
    </div>
  {/if}
</section>