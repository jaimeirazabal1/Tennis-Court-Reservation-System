"use client";

import './globals.css';
import { appWithTranslation } from 'next-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar'; // Asegúrate de importar el NavBar

function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <html lang="es">
        <body className="bg-gray-100 text-gray-900">
          {isLoggedIn && <NavBar />}  {/* Muestra la NavBar solo si el usuario ha iniciado sesión */}
          {children}
        </body>
      </html>
    </I18nextProvider>
  );
}

export default appWithTranslation(RootLayout);
