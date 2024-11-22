// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet';
import { Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapMiniProps {
    latitude: number;
    longitude: number;
    onMapClick?: () => void;
}

export default function MapMini({ latitude, longitude, onMapClick }: MapMiniProps){
    const position: [number, number] = [latitude, longitude];

    // Custom icon (opsional)
    const markerIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <div onClick={onMapClick} className="cursor-pointer">
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '200px', width: '100%' }}
                dragging={false}
                zoomControl={false}
                scrollWheelZoom={false}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
                <Marker position={position} icon={markerIcon}>
                    <Popup>
                        Location: {latitude}, {longitude}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};
