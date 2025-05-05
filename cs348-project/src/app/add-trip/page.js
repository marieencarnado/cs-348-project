'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTripPage() {
  const [trip, setTrip] = useState({
    trip_name: '',
    destination: '',
    continent: '',
    start_date: '',
    end_date: '',
    status: '',
    lodgingType: '',
    selectedBuddies: '',
    total_cost: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...trip,
      selectedBuddies: trip.selectedBuddies.split(',').map((s) => s.trim()),
      total_cost: Number(trip.total_cost)
    };

    const res = await fetch('http://localhost:5002/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert('Trip added!');
      router.push('/');
    } else {
      alert('Failed to add trip.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '1rem' }}>Add New Trip</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Trip Name:
          <input name="trip_name" value={trip.trip_name} onChange={handleChange} required style={inputStyle} />
        </label>

        <label>
          Destination:
          <input name="destination" value={trip.destination} onChange={handleChange} required style={inputStyle} />
        </label>

        <label>
          Continent:
          <select name="continent" value={trip.continent} onChange={handleChange} required style={inputStyle}>
            <option value="">Select continent</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="South America">South America</option>
            <option value="North America">North America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </label>

        <label>
          Start Date:
          <input type="date" name="start_date" value={trip.start_date} onChange={handleChange} required style={inputStyle} />
        </label>

        <label>
          End Date:
          <input type="date" name="end_date" value={trip.end_date} onChange={handleChange} required style={inputStyle} />
        </label>

        <label>
          Status:
          <select name="status" value={trip.status} onChange={handleChange} required style={inputStyle}>
            <option value="">Select status</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label>
          Lodging Type:
          <select name="lodgingType" value={trip.lodgingType} onChange={handleChange} required style={inputStyle}>
            <option value="">Select lodging</option>
            <option value="Hotel">Hotel</option>
            <option value="Hostel">Hostel</option>
            <option value="Friend's Place">Friend's Place</option>
          </select>
        </label>

        <label>
          Buddies (comma separated):
          <input name="selectedBuddies" value={trip.selectedBuddies} onChange={handleChange} required style={inputStyle} />
        </label>

        <label>
          Total Cost:
          <input name="total_cost" value={trip.total_cost} onChange={handleChange} required style={inputStyle} />
        </label>

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}>Submit Trip</button>
      </form>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  marginTop: '0.3rem',
  padding: '0.5rem',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};
