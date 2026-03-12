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

  // 전체 스탬프 투어 스팟 & 종합안내소 (API로부터 전달받은 data 가정)
  const data = {
    spot1: {
      id: 10,
      name: '경복궁 종합안내소 (흥례문)', // 최종 장소
      lat: 37.576832,
      lng: 126.976724,
      hasStamp: false,
      isSelected: false,
    },
    spot2: {
      id: 11,
      name: '경복궁 집옥재',
      lat: 37.58346,
      lng: 126.976075,
      hasStamp: true,
      isSelected: false,
    },
    spot3: {
      id: 12,
      name: '경복궁 향원정',
      lat: 37.582711,
      lng: 126.977202,
      hasStamp: true,
      isSelected: false,
    },
    spot4: {
      id: 20,
      name: '창덕궁 종합안내소 (돈화문)',
      lat: 37.577723,
      lng: 126.989805,
      hasStamp: false,
      isSelected: false,
    },
    spot5: {
      id: 21,
      name: '창덕궁 낙선재',
      lat: 37.578745,
      lng: 126.993507,
      hasStamp: true,
      isSelected: false,
    },
    spot6: {
      id: 30,
      name: '덕수궁 종합안내소 (대한문)',
      lat: 37.565052,
      lng: 126.976668,
      hasStamp: false,
      isSelected: false,
    },
    spot7: {
      id: 31,
      name: '덕수궁 정관헌',
      lat: 37.566453,
      lng: 126.975649,
      hasStamp: true,
      isSelected: false,
    },
    spot8: {
      id: 32,
      name: '덕수궁 준명당',
      lat: 37.566326,
      lng: 126.974737,
      hasStamp: true,
      isSelected: false,
    },
    spot9: {
      id: 40,
      name: '창경궁 종합안내소 (홍화문)',
      lat: 37.578792,
      lng: 126.996511,
      hasStamp: false,
      isSelected: false,
    },
    spot10: {
      id: 41,
      name: '창경궁 명정전',
      lat: 37.578758,
      lng: 126.99491,
      hasStamp: true,
      isSelected: false,
    },
    spot11: {
      id: 42,
      name: '창경궁 통명전',
      lat: 37.57968,
      lng: 126.99374,
      hasStamp: true,
      isSelected: false,
    },
    spot12: {
      id: 43,
      name: '창경궁 대온실',
      lat: 37.582954,
      lng: 126.994051,
      hasStamp: true,
      isSelected: false,
    },
    spot13: {
      id: 51,
      name: '종묘 정전',
      lat: 37.57488,
      lng: 126.993944,
      hasStamp: true,
      isSelected: false,
    },
    spot14: {
      id: 52,
      name: '종묘 영녕전',
      lat: 37.575926,
      lng: 126.992683,
      hasStamp: true,
      isSelected: false,
    },
  };

  const [spots, setSpots] = useState(Object.values(data));
  const [selectedSpots, setSelectedSpots] = useState([]);
  const finalSpot = spots.find((spot) => spot.id === 10); // 원본 배열(spots)과 같은 객체 reference

  // 메시지(경고창) 출력 함수
  function printMessage(message) {
    window.alert(message);
  }

  // 장소 선택(isSelected: true) 처리 함수
  function changeIsSelectedTrue(spot) {
    return { ...spot, isSelected: true };
  }

  // Marker Click Function
  function handleAddSpot(clickedSpot, selectedCount) {
    // console.log(spot.name); // clicked spot right now

    // 첫 번째 장소는 종합 안내소
    // : 아직 아무 장소도 클릭하지 않음 + 현재 클릭한 장소가 스탬프 스팟
    if (!selectedSpots[0] && clickedSpot.hasStamp) {
      printMessage('📌 첫 번째 장소는 종합 안내소를 선택합니다.');
      return;
    }

    // 이후 ONLY hasStamp spot만 추가 가능
    // : 어떤 장소(들)가 이미 클릭됨 + 현재 클릭한 장소가 종합 안내소
    if (selectedSpots[0] && !clickedSpot.hasStamp) {
      printMessage('📌 종합안내소는 첫 번째 장소로만 선택 가능합니다.');
      return;
    }

    // 기존 클릭 장소 중복 추가 방지
    // : 현재 클릭한 장소(clickedSpot=spot)의 isSelected: true
    if (clickedSpot.isSelected) {
      printMessage('📌 이미 추가한 장소입니다.');
      return;
    }

    // Marker 클릭 시 작업
    // 1. spots 배열 내 clickedSpot과 동일한 spot의 속성값 "isSelected: true" 변경
    setSpots((spots) =>
      spots.map((spot) =>
        spot.id === clickedSpot.id ? changeIsSelectedTrue(spot) : spot,
      ),
    );

    // 2. selectedSpots 배열 내 clickedSpot 추가
    setSelectedSpots((selectedSpots) => [
      ...selectedSpots,
      changeIsSelectedTrue(clickedSpot),
    ]);

    // 시작 장소 + 스탬프 10곳 모두 선택 시 최종 장소 추가
    // (※ 단, Array의 길이는 handleAddSpot 함수 종료 후 반영되므로 11이 아닌 10)
    if (selectedCount === 10) {
      // spots 배열 내 최종 장소 속성값 "isSelected: true"
      setSpots((spots) =>
        spots.map((spot) =>
          spot.id === finalSpot.id ? changeIsSelectedTrue(spot) : spot,
        ),
      );

      // selectedSpots 배열 내 최종장소 추가
      setSelectedSpots((selectedSpots) => [
        ...selectedSpots,
        changeIsSelectedTrue(finalSpot), // 속성값 "isSelected: true"
      ]);
    }
  }

  function handleResetList() {
    // selectedSpots 확인용 구문
    console.log(spots, selectedSpots);

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
          {selectedSpots[0] ? (
            <SpotList
              selectedSpots={selectedSpots}
              onResetList={handleResetList}
            />
          ) : (
            <Description />
          )}
        </aside>
        <main className="map-wrapper">
          <StampMap
            position={position}
            spots={spots}
            onAddSpot={handleAddSpot}
            selectedSpots={selectedSpots}
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
