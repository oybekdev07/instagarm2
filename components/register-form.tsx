'use client';

import { useState } from 'react';

interface RegisterFormProps {
  onRegister: (email: string, password: string, source: string) => Promise<void>;
  onFacebookRegister: () => Promise<void>;
  isLoading: boolean;
}

export default function RegisterForm({ onRegister, onFacebookRegister, isLoading }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    try {
      await onRegister(email, password, 'register');
    } catch (err) {
      setError('Xatolik yuz berdi');
    }
  };

  const handleFacebook = async () => {
    try {
      await onFacebookRegister();
    } catch (err) {
      setError('Facebook ro\'yxatdan o\'tish xatosi');
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Instagram Logo */}
        <div className="mb-12 flex justify-center">
          <svg width="175" height="51" viewBox="0 0 175 51" className="fill-current text-foreground">
            <text
              x="0"
              y="40"
              fontSize="40"
              fontFamily="'Segoe UI', Arial, sans-serif"
              fontWeight="300"
              letterSpacing="-2"
            >
              instagram
            </text>
          </svg>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-[#dbdbdb] rounded-sm px-10 py-8 mb-3">
          <h2 className="text-center text-sm text-[#737373] font-semibold mb-6">
            Do&apos;stlaringizni topish va ularning hayotini ko&apos;rish uchun o&apos;z akkauntingizni yarating.
          </h2>

          {/* Facebook Register Button */}
          <button
            type="button"
            onClick={handleFacebook}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-[#0a66c2] hover:bg-[#053a8a] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook orqali ro&apos;yxatdan o&apos;tish
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 border-t border-[#dbdbdb]"></div>
            <span className="px-4 text-xs text-[#737373] font-semibold">
              YOKI
            </span>
            <div className="flex-1 border-t border-[#dbdbdb]"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Elektron pochta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
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
                autoComplete="new-password"
                className="w-full px-4 py-2 bg-[#f5f5f5] border border-[#ccc] text-foreground placeholder-[#999] rounded-sm text-sm focus:outline-none focus:border-[#999] disabled:opacity-50 focus:bg-white transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-[#d91e18] text-sm text-center mt-3 font-medium">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold py-2.5 rounded-lg mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ro\'yxatdan o\'tilmoqda...' : 'Ro\'yxatdan o\'tish'}
            </button>
          </form>
        </div>

        {/* Login Section */}
        <div className="bg-white border border-[#dbdbdb] rounded-sm px-10 py-4 text-center mt-3">
          <span className="text-foreground text-sm">
            Akkaunt bor?{' '}
            <a
              href="/"
              className="font-semibold text-[#0095f6] hover:text-[#1877f2] transition-colors"
            >
              Kirish
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
