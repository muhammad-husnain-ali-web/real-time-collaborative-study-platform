'use client';

import React, { useContext, useEffect } from 'react';
import AuthContext from '@/context/useContext';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';
import { ContextProviderProps, Role } from '@/lib/types';

interface PrivateRouteProps extends ContextProviderProps {
  allowedRoles?: Role[];
}

const PrivateRoute = ({
  children,
  allowedRoles,
}: PrivateRouteProps) => {
  const { user } = useContext(AuthContext) as any;
  const router = useRouter();

  useEffect(() => {
    if (user === null) return;

    console.log(user)

    // Not authenticated
    if (!user.auth) {
      router.replace(`${process.env.NEXT_PUBLIC_APP_URL}/auth/login`);
      return;
    }

    // Role check
    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = user?.user?.role as Role | undefined;

      if (!userRole || !allowedRoles.includes(userRole)) {
        router.replace(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
        return
      }
    }
  }, [user, router, allowedRoles]);

  // Loading auth state
  if (user === null) {
    return <Loader />;
  }

  // Don't render protected content while redirecting
  if (!user.auth) {
    return <Loader />;
  }

  // // Don't render protected content if role isn't allowed
  if (
    allowedRoles?.length &&
    !allowedRoles.includes(user?.user?.role)
  ) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PrivateRoute