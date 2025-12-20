import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    /**
     * authorized() HANYA BOLEH return boolean
     * JANGAN redirect di sini
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // ✅ Izinkan halaman login
      if (pathname.startsWith('/login')) {
        return true;
      }

      // ✅ Izinkan route NextAuth & API
      if (pathname.startsWith('/api')) {
        return true;
      }

      // ✅ Proteksi dashboard
      if (pathname.startsWith('/dashboard')) {
        return isLoggedIn;
      }

      // ✅ Halaman lain bebas
      return true;
    },
  },

  /**
   * Providers diisi di auth.ts
   * (wajib ada tapi boleh kosong di config)
   */
  providers: [],
} satisfies NextAuthConfig;
