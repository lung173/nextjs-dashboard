import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
callbacks: {
  authorized({ auth, request: { nextUrl } }) {
    const isLoggedIn = !!auth?.user;

    // ✅ Izinkan login page & API
    if (nextUrl.pathname.startsWith('/login')) return true;
    if (nextUrl.pathname.startsWith('/api')) return true;

    // ✅ Proteksi dashboard
    if (nextUrl.pathname.startsWith('/dashboard')) {
      return isLoggedIn;
    }

    // ✅ Halaman lain bebas
    return true;
  },
},
