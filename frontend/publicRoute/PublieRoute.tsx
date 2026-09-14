'use client';

import React, { useContext, useEffect } from 'react';
import AuthContext from '@/context/useContext';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';
import { ContextProviderProps } from '@/lib/types';

const PublicRoute = ({ children }: ContextProviderProps) => {
  const { user }: any = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user?.auth) {
      router.replace(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
    }
  }, [user, router]);

  if (user === null) {
    return <Loader />;
  }

  if (user.auth) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PublicRoute;
