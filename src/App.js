import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet'; // Marker 색상 변경을 위한 import 문
import { useState } from 'react';

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

  const [selectedSpots, setSelectedSpots] = useState([]);
  const count = selectedSpots.length;

  // Marker Click Function
  function handleAddSpot(spots, spot, count) {
    console.log(spot.name); // clicked spot right now

    // 첫 번째 장소는 종합 안내소
    if (count === 0 && spot.hasStamp) {
      window.alert('📌 첫 번째 장소는 종합 안내소를 선택합니다.');
      return;
    }

    // 이후 ONLY hasStamp spot만 추가 가능
    if (count > 0 && !spot.hasStamp) {
      window.alert('📌 종합안내소는 첫 번째 장소로만 선택 가능합니다.');
      return;
    }

    // 기존 클릭 장소 중복 추가 방지
    if (selectedSpots.some((exist) => exist.id === spot.id)) {
      window.alert('📌 이미 추가한 장소입니다.');
      return;
    }

    setSelectedSpots((selectedSpots) => [...selectedSpots, spot]);
  }

  function handleResetList() {
    const confirmReset = window.confirm('⚠ 선택한 순서표를 초기화합니다. ⚠');
    if (confirmReset) setSelectedSpots((selectedSpots) => []);
  }

  return (
    <div className="stamp-tour">
      <Logo />
      <StampMap
        position={position}
        spots={spots}
        onAddSpot={handleAddSpot}
        count={count}
      />
      <SideBar
        spots={spots}
        selectedSpots={selectedSpots}
        onResetList={handleResetList}
        count={count}
      />
    </div>
  );
}

// Header Area
function Logo() {
  return (
    <header>
      <h1>2025 궁중문화축전 스탬프 투어</h1>
      <p>
        해당 페이지는 2025 가을 궁중문화축전 스탬프 투어 스팟을 한눈에
        파악하는데 도움이 되고자 만들어졌습니다.
        <br />
        공식 운영 홈페이지가 아니며, 정확한 정보는{' '}
        <a href="https://www.kh.or.kr/fest">궁중문화축전 홈페이지</a>를
        참고하시기 바랍니다.
      </p>
    </header>
  );
}

// StampMap Area
function StampMap({ position, spots, onAddSpot, count }) {
  return (
    <main>
      <MapContainer center={position} zoom={15} className="map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {spots.map((spot) => (
          <Marker
            position={[spot.lat, spot.lng]}
            icon={spot.hasStamp ? blueIcon : redIcon}
            eventHandlers={{
              click: () => onAddSpot(spots, spot, count),
            }}
            key={spot.id}
          >
            {/* <Popup>{spot.name}</Popup> */}
            <Tooltip direction="top" offset={[0, -40]}>
              {spot.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </main>
  );
}

// Side Bar Area
function SideBar({ spots, selectedSpots, count, onResetList }) {
  return (
    <aside className="side-bar">
      <h2>도장 찍기 순서표</h2>
      {count === 0 ? (
        <>
          <h3>📌 이용 안내</h3>
          <ul className="spot-list">
            <li>
              ① 지도에서 도장이 비치된 장소를 눌러 순서표에 장소를 추가합니다.
            </li>
            <li>② 시작 장소는 종합관리소를 선택합니다.</li>
            <li>
              ③ 완주 기념품 수령처(경복궁 종합관리소)는 스탬프 투어 스팟 10곳을
              모두 추가 시 자동으로 순서표에 추가됩니다.
            </li>
            <li>④ 아래 '장소 재설정' 버튼을 클릭하면 목록이 초기화됩니다.</li>
          </ul>
        </>
      ) : (
        ''
      )}
      <SpotList spots={spots} selectedSpots={selectedSpots} count={count} />

      <button className="btn-reset" onClick={onResetList}>
        장소 재설정
      </button>
    </aside>
  );
}

function SpotList({ spots, selectedSpots, count }) {
  return (
    <ul className="spot-list">
      {/* 시작 장소 1곳 + 스탬프 10곳 */}
      {selectedSpots
        // .filter((spot) => spot.hasStamp)
        .map((spot, i) => (
          <Spot spot={spot} num={i} key={spot.id} />
        ))}

      {/* 최종 장소 */}
      {count === 11 ? <Spot spot={spots[0]} key="final-spot" /> : ''}
    </ul>
  );
}

function Spot({ spot, num }) {
  return (
    <>
      {spot.hasStamp ? (
        // 스탬프가 있는 장소의 경우
        <li className="spot-box">
          <h3>
            <span className="number">{num < 10 ? `0${num}` : num}</span>
            {spot.name}
          </h3>
        </li>
      ) : (
        // 스탬프가 없는 장소의 경우
        <li className="spot-box info-spot">
          <h3 className="info-spot">{spot.name}</h3>
        </li>
      )}
    </>
  );
}
