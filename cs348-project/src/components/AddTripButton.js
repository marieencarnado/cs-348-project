'use client';

import { useRouter } from 'next/navigation';

export default function AddTripButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/add-trip')} style={{ marginTop: '1rem' }}>
      ➕ Add New Trip
    </button>
  );
}
