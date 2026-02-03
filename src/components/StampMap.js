import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
} from 'react-leaflet';
import { violetIcon, blueIcon, redIcon } from './App';

// StampMap Area
export default function StampMap({
  position,
  spots,
  onAddSpot,
  count,
  selectedSpots,
  finalSpot,
}) {
  // selected spot의 위치 정보 배열
  const linePositions = selectedSpots.map((spot) => [spot.lat, spot.lng]);

  return (
    <MapContainer center={position} zoom={15} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {linePositions.length > 1 && (
        <Polyline
          positions={linePositions}
          color="#007bff"
          weight={4}
          opacity={0.8}
          dashArray="5,10"
        />
      )}

      {spots.map((spot) => (
        <Marker
          position={[spot.lat, spot.lng]}
          icon={
            spot.isSelected ? violetIcon : spot.hasStamp ? blueIcon : redIcon
          }
          eventHandlers={{
            click: () => onAddSpot(spot, count, finalSpot),
          }}
          key={spot.id}
        >
          <Tooltip direction="top" offset={[0, -40]}>
            {spot.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
