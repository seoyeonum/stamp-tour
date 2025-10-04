import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
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
      <Logo />
      <StampMap position={position} spots={spots} />

      {/* List Area */}
      <SideBar spots={spots} />
    </div>
  );
}

// Header Area
function Logo() {
  return (
    <div>
      <h1>2025 궁중문화축전 스탬프 투어</h1>
      <p>
        해당 페이지는 2025 가을 궁중문화축전 스탬프 투어 스팟을 한눈에
        파악하는데 도움이 되고자 만들어졌습니다.
        <br />
        공식 운영 홈페이지가 아니며, 정확한 정보는{' '}
        <a href="https://www.kh.or.kr/fest">궁중문화축전 홈페이지</a>를
        참고하시기 바랍니다.
      </p>
    </div>
  );
}

// StampMap Area
function StampMap({ position, spots }) {
  return (
    <MapContainer center={position} zoom={15} className="map">
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
          {/* <Popup>{spot.name}</Popup> */}
          <Tooltip direction="top" offset={[0, -20]}>
            {spot.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

// Side Bar Area
function SideBar({ spots }) {
  return (
    <div className="side-bar">
      <h2>
        도장 찍기 순서표<button className="help">?</button>
      </h2>
      <SpotList spots={spots} />
    </div>
  );
}

function SpotList({ spots }) {
  return (
    <ul className="spot-list">
      {spots
        .filter((spot) => spot.hasStamp)
        .map((spot) => (
          <Spot spot={spot} />
        ))}
      <SpotFinal spots={spots} />
    </ul>
  );
}

function Spot({ spot }) {
  return (
    <li className="spot-box" key={spot.id}>
      <h3>
        <span className="number">1</span>
        {spot.name}
      </h3>
    </li>
  );
}

function SpotFinal({ spots }) {
  return (
    <li className="spot-box final-spot" key="final">
      <h3 className="final-spot">{spots[0].name}</h3>
    </li>
  );
}
