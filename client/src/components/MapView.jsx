import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ lat, lng, label }) {
  if (!lat || !lng) return <p className="text-sm text-gray-400">No location set for this tour.</p>;

  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  );
}
