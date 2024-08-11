// components/CourtForm.tsx
import { useState } from 'react';
import axios from 'axios';

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
                await axios.put(`http://localhost:5000/courts/${court.id}`, court);
            } else {
                await axios.post('http://localhost:5000/courts', court);
            }
            alert('Court saved successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Court Name"
                value={court.name}
                onChange={(e) => setCourt({ ...court, name: e.target.value })}
                required
            />
            <select
                value={court.status}
                onChange={(e) => setCourt({ ...court, status: e.target.value })}
            >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
            </select>
            <button type="submit">Save Court</button>
        </form>
    );
};

export default CourtForm;
