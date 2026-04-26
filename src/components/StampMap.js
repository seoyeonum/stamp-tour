import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
} from 'react-leaflet';
import { violetIcon, blueIcon, redIcon } from './App';
import { useEffect, useState } from 'react';

// StampMap Area
export default function StampMap({
  position,
  spots,
  onAddSpot,
  selectedSpots,
}) {
  // selected spot의 위치 정보 배열
  const [routePositions, setRoutePosition] = useState([]);
  const selectedCount = selectedSpots.length;

  // 실제 도보 경로 계산 effect
  useEffect(() => {
    async function walkingRoutes() {
      // 선택 장소가 1군데 이하라면 routePositions 초기화([])
      if (selectedSpots.length < 2) {
        setRoutePosition([]);
        return;
      }

      // 선택 장소가 2군데 이상
      let fullPath = [];

      for (let i = 0; i < selectedSpots.length - 1; i++) {
        const start = selectedSpots[i];
        const end = selectedSpots[i + 1];

        const url =
          `https://router.project-osrm.org/route/v1/foot/` +
          `${start.lng},${start.lat};${end.lng},${end.lat}` +
          `?overview=full&geometries=geojson`;

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (!data.routes || data.routes.length === 0) continue;

          // 새로 추가하는 경로 조각
          const newRoute = data.routes[0].geometry.coordinates.map(
            ([lng, lat]) => [lat, lng],
          );

          // 기존 경로들에 경로 조각 붙이기
          fullPath = [...fullPath, ...newRoute];
        } catch (error) {
          console.log('도보 경로 불러오기 실패:', error);
        }
      }
      setRoutePosition(fullPath);
    }
    walkingRoutes();
  }, [selectedSpots]);

  return (
    <MapContainer center={position} zoom={14} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* selecedSpots 요소 간 연결선 출력 */}
      {routePositions.length > 1 && (
        <Polyline
          positions={routePositions}
          color="#007bff"
          weight={4}
          opacity={0.8}
          // dashArray="5,10"
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
