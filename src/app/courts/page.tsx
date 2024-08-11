"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourtForm from './CourtForm';
import NavBar from '../components/NavBar';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Court {
    id?: number;
    name: string;
    status?: string;
}

interface Reservation {
    courtId: number;
    date: string;
    time: string;
}

const Courts = () => {
    const [courts, setCourts] = useState<Court[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [editingCourt, setEditingCourt] = useState<Court | null>(null);

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

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/courts/${id}`);
            fetchCourts();
            toast.success('Court deleted successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Failed to delete court. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        fetchCourts();
        fetchReservations();
    }, []);

    const isCourtReserved = (courtId: number) => {
        return reservations.some(reservation => reservation.courtId === courtId);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer />
            <h2 className="text-3xl font-bold text-center mb-6">Courts</h2>
            <NavBar />
            <div className="flex justify-center mb-6">
                <CourtForm courtToEdit={editingCourt} />
            </div>
            <ul className="space-y-4">
                {courts.map((court) => (
                    <li key={court.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <span>{court.name} - {isCourtReserved(court.id!) ? 'Reserved' : 'Available'}</span>
                        <div className="space-x-4">
                            <button onClick={() => setEditingCourt(court)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Edit</button>
                            <button onClick={() => handleDelete(court.id!)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Courts;
