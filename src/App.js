import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Marker 색상 변경을 위한 import 문

// Marker Icon - Red
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', // 그림자도 필요!
  shadowSize: [41, 41],
});

// Marker Icon - Blue
const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', // 그림자도 필요!
  shadowSize: [41, 41],
});

export default function App() {
  const position = [37.574419, 126.982628]; // 우정총국 (지도 중앙)
  const spots = [
    {
      id: 10,
      name: '경복궁 종합안내소 (흥례문)',
      lat: 37.576832,
      lng: 126.976724,
      hasStamp: false,
    },
    {
      id: 11,
      name: '경복궁 집옥재',
      lat: 37.58346,
      lng: 126.976075,
      hasStamp: true,
    },
    {
      id: 12,
      name: '경복궁 향원정',
      lat: 37.582711,
      lng: 126.977202,
      hasStamp: true,
    },
    {
      id: 20,
      name: '창덕궁 종합안내소 (돈화문)',
      lat: 37.577723,
      lng: 126.989805,
      hasStamp: false,
    },
    {
      id: 21,
      name: '창덕궁 낙선재',
      lat: 37.578745,
      lng: 126.993507,
      hasStamp: true,
    },
    {
      id: 30,
      name: '덕수궁 종합안내소 (대한문)',
      lat: 37.565052,
      lng: 126.976668,
      hasStamp: false,
    },
    {
      id: 31,
      name: '덕수궁 정관헌',
      lat: 37.566453,
      lng: 126.975649,
      hasStamp: true,
    },
    {
      id: 32,
      name: '덕수궁 준명당',
      lat: 37.566326,
      lng: 126.974737,
      hasStamp: true,
    },
    {
      id: 40,
      name: '창경궁 종합안내소 (홍화문)',
      lat: 37.578792,
      lng: 126.996511,
      hasStamp: false,
    },
    {
      id: 41,
      name: '창경궁 명정전',
      lat: 37.578758,
      lng: 126.99491,
      hasStamp: true,
    },
    {
      id: 42,
      name: '창경궁 통명전',
      lat: 37.57968,
      lng: 126.99374,
      hasStamp: true,
    },
    {
      id: 43,
      name: '창경궁 대온실',
      lat: 37.582954,
      lng: 126.994051,
      hasStamp: true,
    },
    {
      id: 51,
      name: '종묘 정전',
      lat: 37.57488,
      lng: 126.993944,
      hasStamp: true,
    },
    {
      id: 52,
      name: '종묘 영녕전',
      lat: 37.575926,
      lng: 126.992683,
      hasStamp: true,
    },
  ];

  return (
    <div className="stamp-tour">
      {/* Map Area*/}
      <MapContainer center={position} zoom={16} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {spots.map((spot) => (
          <Marker
            position={[spot.lat, spot.lng]}
            icon={spot.hasStamp ? blueIcon : redIcon}
            key={spot.id}
          >
            <Popup>{spot.name}</Popup>
            {/* <Tooltip permanent direction="top" offset={[0, -20]}>
              {spot.name}
            </Tooltip> */}
          </Marker>
        ))}
      </MapContainer>

      {/* List Area */}
      <div className="side-bar">
        <h1>
          도장 찍기 순서표<button className="help">?</button>
        </h1>
        <ul className="spot-list">
          {spots
            .filter((spot) => spot.hasStamp)
            .map((spot) => (
              <li className="spot-box" key={spot.id}>
                <h2>
                  <span className="number">1</span>
                  {spot.name}
                </h2>
              </li>
            ))}
          <li className="spot-box final-spot" key="final">
            <h2 className="final-spot">경복궁 종합안내소</h2>
          </li>
        </ul>
      </div>
    </div>
  );
}
