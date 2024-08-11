"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [courts, setCourts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resReservations = await axios.get(`${API_URL}/reservations`);
                const resCourts = await axios.get(`${API_URL}/courts`);
                const resUsers = await axios.get(`${API_URL}/users`);
                setReservations(resReservations.data);
                setCourts(resCourts.data);
                setUsers(resUsers.data);
            } catch (error) {
                toast.error('Failed to fetch data. Please try again.', {
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
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <ToastContainer />
            <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Reservations</h3>
                    <ul>
                        {reservations.map((reservation) => (
                            <li key={reservation.id}>
                                Court {reservation.courtId} - {reservation.date} at {reservation.time} ({reservation.type})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Courts</h3>
                    <ul>
                        {courts.map((court) => (
                            <li key={court.id}>{court.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Users</h3>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.username} - {user.role}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
