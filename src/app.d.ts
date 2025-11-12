// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      admin: { id: number; email: string } | null;
    }
  }
}
export {};
