"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Reservation {
    id: number;
    courtId: number;
    userId: number;
    date: string;
    time: string;
    type: string;
}

const History = () => {
    const { t } = useTranslation('common');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`${API_URL}/reservations?userId=${currentUser.id}`);
            setReservations(response.data);
        } catch (error) {
            toast.error(t('fetch_failed'));
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        setCurrentUser(user);
        if (user) {
            fetchReservations();
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer />
            <h2 className="text-3xl font-bold text-center mb-6">{t('view_history')}</h2>
            {reservations.length > 0 ? (
                <ul className="space-y-4">
                    {reservations.map((reservation) => (
                        <li key={reservation.id} className="bg-white p-4 rounded-lg shadow">
                            <p>{t('court')}: {reservation.courtId}</p>
                            <p>{t('date')}: {reservation.date}</p>
                            <p>{t('time')}: {reservation.time}</p>
                            <p>{t('type')}: {reservation.type}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{t('no_history')}</p>
            )}
        </div>
    );
};

export default History;
