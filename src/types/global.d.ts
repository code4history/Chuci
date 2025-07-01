// Global type declarations for Chuci

declare global {
  interface Window {
    // gsplat.js library global - external library without TypeScript types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsplat?: any;
  }
}

export {}