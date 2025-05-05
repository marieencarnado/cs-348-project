'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [trips, setTrips] = useState([]);
  const [filteredContinent, setFilteredContinent] = useState('');
  const [expandedTripId, setExpandedTripId] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch('http://localhost:5002/api/trips');
        const contentType = res.headers.get("content-type");

        if (!res.ok || !contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response from server");
        }

        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.error('Failed to load trips:', err);
        setError('Could not load trips. Please check the server.');
      }
    };
    fetchTrips();
  }, []);

  const handleContinentFilter = (e) => {
    setFilteredContinent(e.target.value);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      try {
        const res = await fetch(`http://localhost:5002/api/trips/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setTrips(trips.filter(trip => trip._id !== id));
        }
      } catch (err) {
        console.error('Failed to delete trip:', err);
      }
    }
  };

  const toggleDetails = (id) => {
    setExpandedTripId(expandedTripId === id ? null : id);
  };

  const filteredTrips = filteredContinent
    ? trips.filter((trip) => trip.continent === filteredContinent)
    : trips;

  const totalTrips = filteredTrips.length;
  const avgCost = filteredTrips.length > 0
    ? (filteredTrips.reduce((sum, trip) => sum + (trip.total_cost || 0), 0) / filteredTrips.length).toFixed(2)
    : 0;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', textDecoration: 'underline', color: '#555' }}>
        My Travel Bucket List
      </h1>

      <Link href="/add-trip">
        <button style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
          ➕ Add Trip
        </button>
      </Link>

      <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', color: '#333' }}>My Current Bucket List</h2>

      <div style={{ marginTop: '1.5rem' }}>
        <label htmlFor="continent">Filter by Continent:</label>
        <select
          id="continent"
          onChange={handleContinentFilter}
          value={filteredContinent}
          style={{ marginLeft: '0.5rem', padding: '0.5rem' }}
        >
          <option value="">All Continents</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {filteredTrips.length === 0 ? (
        <p style={{ marginTop: '1rem' }}>No trips yet. Add one to get started!</p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {filteredTrips.map((trip) => (
            <div
              key={trip._id}
              style={{
                width: '250px',
                height: '250px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                position: 'relative',
                overflowY: 'auto'
              }}
            >
              <h3
                onClick={() => toggleDetails(trip._id)}
                style={{
                  cursor: 'pointer',
                  color: '#000',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}
              >
                {trip.trip_name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#666' }}>Click trip to display details</p>
              {expandedTripId === trip._id && (
                <div style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                  <p><strong>Country:</strong> {trip.destination}</p>
                  <p><strong>Continent:</strong> {trip.continent}</p>
                  <p><strong>Lodging:</strong> {trip.lodgingType}</p>
                  <p><strong>Status:</strong> {trip.status}</p>
                  <p><strong>Start Date:</strong> {trip.start_date}</p>
                  <p><strong>End Date:</strong> {trip.end_date}</p>
                  <p><strong>Total Cost:</strong> ${trip.total_cost}</p>
                  <p><strong>Buddies:</strong> {trip.selectedBuddies?.join(', ')}</p>
                </div>
              )}
              <button
                onClick={() => handleDelete(trip._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Delete
              </button>
              <button
                onClick={() => router.push(`/edit-trip/${trip._id}`)}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  backgroundColor: 'goldenrod',
                  color: 'black',
                  border: 'none',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
