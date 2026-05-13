import { useEffect, useState } from 'react';
import axios from 'axios';

const SetFarmLocation = () => {
  const [status, setStatus] = useState('Getting your location...');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported by your browser.');
      return;
    }

    // Get current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setStatus(`Location found: ${latitude}, ${longitude}. Saving...`);

        // Get token from localStorage (adjust key if different)
        const token = localStorage.getItem('token');
        if (!token) {
          setStatus('Error: You are not logged in. Please login as farmer.');
          return;
        }

        try {
          const res = await axios.put(
            'http://localhost:5000/api/farmers/location',
            { lng: longitude, lat: latitude },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setStatus('✅ Farm location saved successfully!');
          setSaved(true);
        } catch (err) {
          console.error(err);
          setStatus(`❌ Failed to save: ${err.response?.data?.message || err.message}`);
        }
      },
      (error) => {
        setStatus(`❌ Location permission denied or error: ${error.message}`);
      }
    );
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Set Your Farm Location</h2>
      <p>{status}</p>
      {saved && <p>Your farm will appear on the consumer map.</p>}
    </div>
  );
};

export default SetFarmLocation;