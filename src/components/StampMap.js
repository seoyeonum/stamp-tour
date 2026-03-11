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
  selectedSpots,
}) {
  // selected spot의 위치 정보 배열
  const linePositions = selectedSpots.map((spot) => [spot.lat, spot.lng]);
  const selectedCount = selectedSpots.length;

  return (
    <MapContainer center={position} zoom={14} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* selecedSpots 요소 간 연결선 출력 */}
      {linePositions.length > 1 && (
        <Polyline
          positions={linePositions}
          color="#007bff"
          weight={4}
          opacity={0.8}
          dashArray="5,10"
        />
      )}

      {/* map 위 spot에 Marker 표시 */}
      {spots.map((spot) => (
        <Marker
          position={[spot.lat, spot.lng]}
          icon={
            spot.hasStamp ? blueIcon : spot.isSelected ? violetIcon : redIcon
          }
          eventHandlers={{
            click: () => onAddSpot(spot, selectedCount),
          }}
          key={spot.id}
        >
          <Tooltip className="spot-name" direction="top" offset={[0, -40]}>
            {spot.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
