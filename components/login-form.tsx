'use client';

import { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
  onFacebookLogin?: () => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ onLogin, onFacebookLogin, isLoading }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Iltimos, foydalanuvchi nomi va parolni kiriting');
      return;
    }

    try {
      await onLogin(username, password);
    } catch (err) {
      setError('Xatolik yuz berdi');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Instagram Icon and Logo */}
        <div className="mb-8 flex items-center gap-3">
          {/* Instagram Icon */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="2" y="2" width="20" height="20" rx="4.5" ry="4.5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </div>
          
          {/* Instagram Logo Text */}
          <svg width="140" height="40" viewBox="0 0 175 51" className="fill-current text-foreground">
            <text
              x="0"
              y="35"
              fontSize="35"
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight="300"
              letterSpacing="-1.5"
            >
              instagram
            </text>
          </svg>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#dbdbdb] rounded-sm px-10 py-8 mb-3">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Username Input */}
            <div>
              <input
                type="text"
                placeholder="Telefon raqami, foydalanuvchi nomi yoki elektron pochta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                autoComplete="username"
                className="w-full px-4 py-2 bg-[#f5f5f5] border border-[#ccc] text-foreground placeholder-[#999] rounded-sm text-sm focus:outline-none focus:border-[#999] disabled:opacity-50 focus:bg-white transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                className="w-full px-4 py-2 bg-[#f5f5f5] border border-[#ccc] text-foreground placeholder-[#999] rounded-sm text-sm focus:outline-none focus:border-[#999] disabled:opacity-50 focus:bg-white transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-[#d91e18] text-sm text-center mt-3 font-medium">
                {error}
              </div>
            )}

            {/* Login Button - Instagram Blue */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold py-2.5 rounded-lg mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Kirish...' : 'Kirish'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-[#dbdbdb]"></div>
            <span className="px-4 text-xs text-[#737373] font-semibold">
              YOKI
            </span>
            <div className="flex-1 border-t border-[#dbdbdb]"></div>
          </div>

          {/* Facebook Login */}
          <button
            type="button"
            onClick={onFacebookLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center text-[#0095f6] font-semibold text-sm py-2 hover:text-blue-700 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook orqali kirish
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-xs text-[#0095f6] hover:text-[#1877f2] transition-colors"
            >
              Parolni unutdingizmi?
            </a>
          </div>
        </div>

        {/* Sign Up Section */}
        <div className="bg-white border border-[#dbdbdb] rounded-sm px-10 py-4 text-center mt-3">
          <span className="text-foreground text-sm">
            Akkaunt yo&apos;qmi?{' '}
            <a
              href="/register"
              className="font-semibold text-[#0095f6] hover:text-[#1877f2] transition-colors"
            >
              Ro&apos;yxatdan o&apos;tish
            </a>
          </span>
        </div>

        {/* App Download Section */}
        <div className="text-center mt-8">
          <p className="text-foreground text-sm mb-4">Dasturni yuklab oling.</p>
          <div className="flex justify-center gap-2">
            <a
              href="#"
              className="border border-[#dbdbdb] px-3 py-2 rounded text-xs font-semibold text-foreground hover:bg-[#f0f0f0] transition-colors"
            >
              App Store
            </a>
            <a
              href="#"
              className="border border-[#dbdbdb] px-3 py-2 rounded text-xs font-semibold text-foreground hover:bg-[#f0f0f0] transition-colors"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
