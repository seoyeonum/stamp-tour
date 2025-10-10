import L from 'leaflet'; // Marker 색상 변경을 위한 import 문
import { useState } from 'react';
import Logo from './Logo';
import StampMap from './StampMap';
import SideBar from './SideBar';

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
  const count = selectedSpots.length;

  // Marker Click Function
  function handleAddSpot(spot, count, finalSpot) {
    // console.log(spot.name); // clicked spot right now

    // 첫 번째 장소는 종합 안내소
    if (count === 0 && spot.hasStamp) {
      const message = '📌 첫 번째 장소는 종합 안내소를 선택합니다.';
      window.alert(message);
      return;
    }

    // 이후 ONLY hasStamp spot만 추가 가능
    if (count > 0 && !spot.hasStamp) {
      const message = '📌 종합안내소는 첫 번째 장소로만 선택 가능합니다.';
      window.alert(message);
      return;
    }

    // 기존 클릭 장소 중복 추가 방지
    if (selectedSpots.some((exist) => exist.id === spot.id)) {
      const message = '📌 이미 추가한 장소입니다.';
      window.alert(message);
      return;
    }

    // Marker 클릭 시 종합안내소에 한하여 속성값 변경
    setSpots((spots) =>
      spots.map((exist) =>
        !exist.hasStamp && exist.id === spot.id
          ? { ...exist, isSelected: true }
          : exist
      )
    );

    // selectedSpots에 spot 추가
    setSelectedSpots((selectedSpots) => [...selectedSpots, spot]);
    console.log(selectedSpots, count);

    // 시작 장소 + 스탬프 10곳 모두 선택 시 최종 장소 추가
    // (※ 단, Array의 길이는 handleAddSpot 함수 종료 후 반영되므로 11이 아닌 10)
    if (count === 10) {
      setSelectedSpots((selectedSpots) => [...selectedSpots, finalSpot]);
      setSpots((spots) =>
        spots.map((exist) =>
          exist.name === finalSpot.name ? { ...exist, isSelected: true } : exist
        )
      );
    }
  }

  function handleResetList() {
    const message = '⚠ 선택한 순서표를 초기화합니다. ⚠';
    const confirmReset = window.confirm(message);
    if (confirmReset) {
      setSelectedSpots([]);
      spots.map((spot) => (spot.isSelected = false));
    }
  }

  return (
    <div className="stamp-tour">
      <Logo />
      <StampMap
        position={position}
        spots={spots}
        onAddSpot={handleAddSpot}
        count={count}
        selectedSpots={selectedSpots}
        finalSpot={finalSpot}
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
