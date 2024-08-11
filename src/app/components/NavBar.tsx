"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome, AiOutlineHistory, AiOutlineLogout } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';

const NavBar = () => {
    const router = useRouter();
    const { t } = useTranslation('common');
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <nav className="bg-blue-600 text-white fixed bottom-0 inset-x-0 p-4 flex justify-around items-center shadow-lg">
            <Link href="/reserve" className="flex flex-col items-center hover:text-gray-300 transition">
                <AiOutlineHome size={24} />
                <span className="text-xs">{t('reserve_court')}</span>
            </Link>
            <Link href="/history" className="flex flex-col items-center hover:text-gray-300 transition">
                <AiOutlineHistory size={24} />
                <span className="text-xs">{t('view_history')}</span>
            </Link>
            <Link href="/admin/dashboard" className="flex flex-col items-center hover:text-gray-300 transition">
                <FiSettings size={24} />
                <span className="text-xs">{t('admin_dashboard')}</span>
            </Link>
            <button onClick={handleLogout} className="flex flex-col items-center hover:text-gray-300 transition">
                <AiOutlineLogout size={24} />
                <span className="text-xs">{t('logout')}</span>
            </button>
        </nav>
    );
};

export default NavBar;
