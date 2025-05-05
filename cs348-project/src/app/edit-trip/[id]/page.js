'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditTripPage() {
  const router = useRouter();
  const { id } = useParams();

  const [trip, setTrip] = useState({
    trip_name: '',
    destination: '',
    continent: '',
    lodgingType: '',
    total_cost: '',
    status: '',
    start_date: '',
    end_date: '',
    selectedBuddies: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        console.log('Fetching trip:', id);
        const res = await fetch(`http://localhost:5002/api/trips/${id}`);
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        console.log('Trip data:', data);

        setTrip({
          trip_name: data.trip_name || '',
          destination: data.destination || '',
          continent: data.continent || '',
          lodgingType: data.lodgingType || '',
          total_cost: data.total_cost || '',
          status: data.status || '',
          start_date: data.start_date?.substring(0, 10) || '',
          end_date: data.end_date?.substring(0, 10) || '',
          selectedBuddies: data.selectedBuddies || []
        });
      } catch (err) {
        console.error('Error fetching trip:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5002/api/trips/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...trip,
          total_cost: Number(trip.total_cost)
        })
      });
      if (res.ok) {
        alert('Trip updated!');
        router.push('/');
      } else {
        alert('Failed to update trip');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('An error occurred while updating.');
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading trip...</p>;

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f9ff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{
        fontSize: '2rem',
        marginBottom: '1.5rem',
        color: '#333',
        textAlign: 'center'
      }}>Edit Trip</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Trip Name:
          <input name="trip_name" value={trip.trip_name} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Destination:
          <input name="destination" value={trip.destination} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Continent:
          <input name="continent" value={trip.continent} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Lodging Type:
          <input name="lodgingType" value={trip.lodgingType} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Total Cost:
          <input name="total_cost" type="number" value={trip.total_cost} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Status:
          <select name="status" value={trip.status} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}>
            <option value="">Select status</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Start Date:
          <input type="date" name="start_date" value={trip.start_date} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          End Date:
          <input type="date" name="end_date" value={trip.end_date} onChange={handleChange} required
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }} />
        </label>

        <button type="submit" style={{
          padding: '0.75rem',
          backgroundColor: '#2d8cf0',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Update Trip
        </button>
      </form>
    </div>
  );
}
