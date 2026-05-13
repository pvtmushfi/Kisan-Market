import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const FarmMap = () => {
  const [position, setPosition] = useState([28.6139, 77.2090]); // Default Delhi
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchNearbyFarmers(longitude, latitude);
      });
    }
  }, []);

  const fetchNearbyFarmers = async (lng, lat) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/farmers/nearby?lng=${lng}&lat=${lat}&radius=20`);
      setFarmers(res.data);
    } catch (err) {
      console.error('Error fetching farmers:', err);
    }
  };

  return (
    <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {farmers.map((farmer) => (
        <Marker key={farmer._id} position={[farmer.location.coordinates[1], farmer.location.coordinates[0]]}>
          <Popup>
            <b>{farmer.name}</b><br />
            {farmer.farmDetails?.cropType || 'Farmer'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default FarmMap;