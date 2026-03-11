import L from 'leaflet'; // Marker 색상 변경을 위한 import 문
import { useState } from 'react';
import Description from './Description';
import StampMap from './StampMap';
import SpotList from './SpotList';

// Marker Icon - Red
export const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Marker Icon - Blue
export const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Marker Icon - Violet
export const violetIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function App() {
  // 우정총국 (지도 중앙)
  const position = [37.574419, 126.982628];

  // 경복궁 종합안내소 (최종 장소)
  const finalSpot = {
    id: 99,
    name: '경복궁 종합안내소 (흥례문)',
    lat: 37.576832,
    lng: 126.976724,
    hasStamp: false,
    isSelected: true,
  };

  // 전체 스탬프 투어 스팟 & 종합안내소
  const [spots, setSpots] = useState([
    {
      id: 10,
      name: '경복궁 종합안내소 (흥례문)',
      lat: 37.576832,
      lng: 126.976724,
      hasStamp: false,
      isSelected: false,
    },
    {
      id: 11,
      name: '경복궁 집옥재',
      lat: 37.58346,
      lng: 126.976075,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 12,
      name: '경복궁 향원정',
      lat: 37.582711,
      lng: 126.977202,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 20,
      name: '창덕궁 종합안내소 (돈화문)',
      lat: 37.577723,
      lng: 126.989805,
      hasStamp: false,
      isSelected: false,
    },
    {
      id: 21,
      name: '창덕궁 낙선재',
      lat: 37.578745,
      lng: 126.993507,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 30,
      name: '덕수궁 종합안내소 (대한문)',
      lat: 37.565052,
      lng: 126.976668,
      hasStamp: false,
      isSelected: false,
    },
    {
      id: 31,
      name: '덕수궁 정관헌',
      lat: 37.566453,
      lng: 126.975649,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 32,
      name: '덕수궁 준명당',
      lat: 37.566326,
      lng: 126.974737,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 40,
      name: '창경궁 종합안내소 (홍화문)',
      lat: 37.578792,
      lng: 126.996511,
      hasStamp: false,
      isSelected: false,
    },
    {
      id: 41,
      name: '창경궁 명정전',
      lat: 37.578758,
      lng: 126.99491,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 42,
      name: '창경궁 통명전',
      lat: 37.57968,
      lng: 126.99374,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 43,
      name: '창경궁 대온실',
      lat: 37.582954,
      lng: 126.994051,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 51,
      name: '종묘 정전',
      lat: 37.57488,
      lng: 126.993944,
      hasStamp: true,
      isSelected: false,
    },
    {
      id: 52,
      name: '종묘 영녕전',
      lat: 37.575926,
      lng: 126.992683,
      hasStamp: true,
      isSelected: false,
    },
  ]);

  const [selectedSpots, setSelectedSpots] = useState([]);
  const selectedCount = selectedSpots.length;

  // 메시지(경고창) 출력 함수
  function printMessage(message) {
    window.alert(message);
  }

  // Marker Click Function
  function handleAddSpot(clickedSpot, count, finalSpot) {
    // console.log(spot.name); // clicked spot right now

    // 첫 번째 장소는 종합 안내소
    // : 아직 아무 장소도 클릭하지 않음 + 현재 클릭한 장소가 스탬프 스팟
    if (count === 0 && clickedSpot.hasStamp) {
      printMessage('📌 첫 번째 장소는 종합 안내소를 선택합니다.');
      return;
    }

    // 이후 ONLY hasStamp spot만 추가 가능
    // : 어떤 장소(들)가 이미 클릭됨 + 현재 클릭한 장소가 종합 안내소
    if (count > 0 && !clickedSpot.hasStamp) {
      printMessage('📌 종합안내소는 첫 번째 장소로만 선택 가능합니다.');
      return;
    }

    // 기존 클릭 장소 중복 추가 방지
    // : 현재 클릭한 장소의 id가 이미 클릭한 장소의 id 중 하나라도 일치
    if (selectedSpots.some((exist) => exist.id === clickedSpot.id)) {
      printMessage('📌 이미 추가한 장소입니다.');
      return;
    }

    // 1. Marker 클릭 시 종합안내소에 한하여 속성값 변경
    // : 종합 안내소이며, 현재 선택한 clickedSpot과 id가 일치하는 장소면 "isSelected: true" 처리
    setSpots((spots) =>
      spots.map((exist) =>
        !exist.hasStamp && exist.id === clickedSpot.id
          ? { ...exist, isSelected: true }
          : exist,
      ),
    );

    // 2. selectedSpots에 clickedSpot 추가
    setSelectedSpots((selectedSpots) => [...selectedSpots, clickedSpot]);

    // 시작 장소 + 스탬프 10곳 모두 선택 시 최종 장소 추가
    // (※ 단, Array의 길이는 handleAddSpot 함수 종료 후 반영되므로 11이 아닌 10)
    if (count === 10) {
      setSelectedSpots((selectedSpots) => [...selectedSpots, finalSpot]);
      setSpots((spots) =>
        spots.map((exist) =>
          exist.name === finalSpot.name
            ? { ...exist, isSelected: true }
            : exist,
        ),
      );
    }
  }

  function handleResetList() {
    const message = '⚠ 선택한 순서표를 초기화합니다. ⚠';
    const confirmReset = window.confirm(message);

    // Guard Clause
    if (!confirmReset) return;

    setSelectedSpots([]);
    spots.map((spot) => (spot.isSelected = false));
  }

  return (
    <div className="app">
      <Nav />

      <div className="layout">
        <aside className="aside">
          {selectedCount === 0 ? (
            <Description />
          ) : (
            <SpotList
              selectedSpots={selectedSpots}
              onResetList={handleResetList}
            />
          )}
        </aside>
        <main className="map-wrapper">
          <StampMap
            position={position}
            spots={spots}
            onAddSpot={handleAddSpot}
            count={selectedCount}
            selectedSpots={selectedSpots}
            finalSpot={finalSpot}
          />
        </main>
      </div>
    </div>
  );
}

// TOP NAVIGATION
function Nav() {
  return (
    <nav className="nav">
      <img src="logo.png" alt="Logo" className="nav__logo" />
      {/*
      <ul className="nav__links">
        <li class="nav__item">
          <a class="nav__link" href="#">
            HOME
          </a>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="#">
            StampTour
          </a>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="#">
            MyPage
          </a>
        </li>
      </ul>
      */}
    </nav>
  );
}
