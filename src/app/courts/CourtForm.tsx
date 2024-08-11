"use client";

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Court {
    id?: number;
    name: string;
    status: string;
}

const CourtForm = ({ courtToEdit }: { courtToEdit?: Court }) => {
    const [court, setCourt] = useState<Court>(
        courtToEdit || { name: '', status: 'available' }
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (court.id) {
                await axios.put(`${API_URL}/courts/${court.id}`, court);
                toast.success('Court updated successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                await axios.post(`${API_URL}/courts`, court);
                toast.success('Court created successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            setCourt({ name: '', status: 'available' });
        } catch (error) {
            toast.error('Failed to save court. Please try again.', {
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

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <input
                type="text"
                placeholder="Court Name"
                value={court.name}
                onChange={(e) => setCourt({ ...court, name: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={court.status}
                onChange={(e) => setCourt({ ...court, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Save Court
            </button>
        </form>
    );
};

export default CourtForm;
