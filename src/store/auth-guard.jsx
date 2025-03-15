'use client';

import { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '@/store/auth-context';

// List of paths that don't require authentication
const publicPaths = ['/signin', '/signup', '/forgot-password', '/reset-password'];

export default function AuthGuard({ children }) {
  const { isLoading, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
    
  //   if (!isLoading && !isAuthenticated && !isPublicPath) {
  //     // If not authenticated and not on a public path, redirect to signin
  //     checkAuth(true); // This will redirect if authentication fails
  //   } else if (!isLoading && isAuthenticated && isPublicPath) {
  //     // If authenticated and on a public path, redirect to home
  //     router.push('/');
  //   }
  // }, [isLoading, isAuthenticated, pathname, router, checkAuth]);

  // Show loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  //     </div>
  //   );
  // }

  // For public paths or authenticated users, render children
  return children;
}