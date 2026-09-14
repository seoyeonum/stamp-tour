import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
} from 'react-leaflet';
import { violetIcon, blueIcon, redIcon } from './markerIcons';
import { useEffect, useRef, useState } from 'react';

// StampMap Area
export default function StampMap({
  position,
  spots,
  onAddSpot,
  selectedSpots,
}) {
  // selected spot의 위치 정보 배열
  const [routePositions, setRoutePosition] = useState([]);

  // useRef: re-rendering에도 값을 유지!
  const routeObject = useRef({});

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
        const routeKey = `${start.id}-${end.id}`; /////

        let newRoute = routeObject.current[routeKey];

        // 이미 route를 구해서 routeObject에 routeKey가 있다면,
        // !newRoute === false이므로 아래 조건문을 수행하지 않는다.
        // 즉, 새로 route를 구하는 상황에만 아래 조건문에 진입한다.
        if (!newRoute) {
          const url =
            `https://router.project-osrm.org/route/v1/foot/` +
            `${start.lng},${start.lat};${end.lng},${end.lat}` +
            `?overview=full&geometries=geojson`;

          try {
            const res = await fetch(url);
            const data = await res.json();

            // fetch 한 데이터의 routes 가 존재하지 않는다면 반복문 내 아래 과정 통과 (미수행)
            if (!data.routes || data.routes.length === 0) continue;

            // 새로 추가하는 경로 조각을 newRoute에 담아
            newRoute = data.routes[0].geometry.coordinates.map(([lng, lat]) => [
              lat,
              lng,
            ]);

            // 현재 routeKey를 key로 routeObject에 저장
            routeObject.current[routeKey] = newRoute;
          } catch (error) {
            console.log('도보 경로 불러오기 실패:', error);
            continue;
          }
        }
        // 기존 경로들에 경로 조각 붙이기
        fullPath = [...fullPath, ...newRoute];
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
            // click: () => onAddSpot(spot, selectedCount),
            click: () => onAddSpot(spot),
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
