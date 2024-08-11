"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Court {
    id: number;
    name: string;
    imageUrl?: string;
}

interface Reservation {
    id: number;
    courtId: number;
    userId: number;
    date: string;
    time: string;
    type: string; // "single" or "double"
}

const Reserve = () => {
    const { t } = useTranslation('common');
    const [courts, setCourts] = useState<Court[]>([]);
    const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [type, setType] = useState('single');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const fetchCourts = async () => {
        try {
            const response = await axios.get(`${API_URL}/courts`);
            setCourts(response.data);
        } catch (error) {
            console.error('Error fetching courts', error);
        }
    };

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`${API_URL}/reservations`);
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations', error);
        }
    };

    const isCourtAvailable = (courtId: number, selectedDate: string, selectedTime: string) => {
        return !reservations.some(
            reservation =>
                reservation.courtId === courtId &&
                reservation.date === selectedDate &&
                reservation.time === selectedTime
        );
    };

    const handleReserve = async () => {
        if (!selectedCourt) return toast.error(t('select_court'));
        if (!time) return toast.error(t('select_time'));

        const formattedDate = date.toISOString().split('T')[0];
        if (!isCourtAvailable(selectedCourt.id, formattedDate, time)) {
            return toast.error(t('court_reserved'));
        }

        try {
            const response = await axios.post(`${API_URL}/reservations`, {
                courtId: selectedCourt.id,
                userId: currentUser.id,
                date: formattedDate,
                time,
                type,
            });
            toast.success(t('reservation_successful'));
            fetchReservations();
        } catch (error) {
            toast.error(t('reservation_failed'));
        }
    };

    const handleDelete = async (reservationId: number) => {
        const reservation = reservations.find(r => r.id === reservationId);
        if (reservation?.userId !== currentUser?.id) {
            return toast.error(t('delete_failed'));
        }
        try {
            await axios.delete(`${API_URL}/reservations/${reservationId}`);
            toast.success(t('reservation_deleted'));
            fetchReservations();
        } catch (error) {
            toast.error(t('delete_failed'));
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        setCurrentUser(user);
        fetchCourts();
        fetchReservations();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer />
            <h2 className="text-3xl font-bold text-center mb-6">{t('reserve_court')}</h2>
            <div className="flex flex-col items-center mb-6">
                <select onChange={(e) => setSelectedCourt(courts.find(c => c.id === +e.target.value) || null)} className="mb-4 p-2 rounded-lg border">
                    <option value="">{t('select_court')}</option>
                    {courts.map((court) => (
                        <option key={court.id} value={court.id}>
                            {court.name}
                        </option>
                    ))}
                </select>
                {selectedCourt?.imageUrl && (
                    <img src={selectedCourt.imageUrl} alt={selectedCourt.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                )}
                <Calendar value={date} onChange={setDate} className="mb-4" />
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mb-4 p-2 rounded-lg border" />
                <select value={type} onChange={(e) => setType(e.target.value)} className="mb-4 p-2 rounded-lg border">
                    <option value="single">{t('single')}</option>
                    <option value="double">{t('double')}</option>
                </select>
                <button onClick={handleReserve} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    {t('reserve_court')}
                </button>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">{t('view_reservations')}</h3>
                {reservations.length > 0 ? (
                    <ul className="space-y-4">
                        {reservations.map((reservation) => {
                            console.log('reservation', reservation)
                            return <li key={reservation.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                                <div>
                                    <p>{t('court')}: {courts.find(c => c.id == reservation.courtId)?.name}</p>
                                    <p>{t('date')}: {reservation.date}</p>
                                    <p>{t('time')}: {reservation.time}</p>
                                    <p>{t('type')}: {reservation.type}</p>
                                    <p>{t('reserved_by')}: {currentUser.id === reservation.userId ? t('you') : `User ${reservation.userId}`}</p>
                                </div>
                                {currentUser.id === reservation.userId && (
                                    <button onClick={() => handleDelete(reservation.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                        {t('delete_reservation')}
                                    </button>
                                )}
                            </li>
                        }

                        )}
                    </ul>
                ) : (
                    <p>{t('no_reservations')}</p>
                )}
            </div>
        </div>
    );
};

export default Reserve;
