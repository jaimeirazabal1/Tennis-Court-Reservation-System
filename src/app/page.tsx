"use client";

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Home = () => {
  const { t, i18n } = useTranslation('common');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setLoaded(true);
    } else {
      i18n.on('initialized', () => {
        setLoaded(true);
      });
    }
  }, [i18n]);

  if (!loaded) {
    return <div>Cargando...</div>;  // Puedes cambiar esto por un loader más elegante si lo prefieres
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">{t('welcome')}</h1>
      <div className="space-x-4 flex flex-col sm:flex-row w-full justify-center">
        <Link href="/register" className="bg-white text-blue-500 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition text-center">
          {t('register')}
        </Link>
        <Link href="/login" className="bg-white text-green-500 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition text-center">
          {t('login')}
        </Link>
      </div>
    </div>
  );
};

export default Home;
