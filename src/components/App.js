import { useEffect, useState } from 'react';
import Description from './Description';
import StampMap from './StampMap';
import SpotList from './SpotList';
import { printAlert, printConfirm } from './helper';

////////// API DATA (가정) //////////
// 우정총국 (지도 중앙)
const position = [37.574419, 126.982628];

// 전체 스탬프 투어 스팟 & 종합안내소
const placeData = {
  spot00: {
    id: 10,
    name: '경복궁 종합안내소 (흥례문)', // 최종 장소
    lat: 37.576832,
    lng: 126.976724,
    hasStamp: false,
    isSelected: false,
  },
  spot01: {
    id: 11,
    name: '경복궁 집옥재',
    lat: 37.58346,
    lng: 126.976075,
    hasStamp: true,
    isSelected: false,
  },
  spot02: {
    id: 12,
    name: '경복궁 향원정',
    lat: 37.582711,
    lng: 126.977202,
    hasStamp: true,
    isSelected: false,
  },
  spot03: {
    id: 13,
    name: '경복궁 강녕전',
    lat: 37.579537,
    lng: 126.977017,
    hasStamp: true,
    isSelected: false,
  },
  spot04: {
    id: 14,
    name: '경복궁 계조당',
    lat: 37.577893,
    lng: 126.977884,
    hasStamp: true,
    isSelected: false,
  },
  spot05: {
    id: 20,
    name: '창덕궁 종합안내소 (돈화문)',
    lat: 37.577723,
    lng: 126.989805,
    hasStamp: false,
    isSelected: false,
  },
  spot06: {
    id: 21,
    name: '창덕궁 낙선재',
    lat: 37.578745,
    lng: 126.993507,
    hasStamp: true,
    isSelected: false,
  },
  spot07: {
    id: 22,
    name: '창덕궁 대조전',
    lat: 37.580239,
    lng: 126.992476,
    hasStamp: true,
    isSelected: false,
  },
  spot08: {
    id: 30,
    name: '덕수궁 종합안내소 (대한문)',
    lat: 37.565052,
    lng: 126.976668,
    hasStamp: false,
    isSelected: false,
  },
  spot09: {
    id: 31,
    name: '덕수궁 정관헌',
    lat: 37.566453,
    lng: 126.975649,
    hasStamp: true,
    isSelected: false,
  },
  spot10: {
    id: 32,
    name: '덕수궁 준명당',
    lat: 37.566326,
    lng: 126.974737,
    hasStamp: true,
    isSelected: false,
  },
  spot11: {
    id: 33,
    name: '덕수궁 즉조당',
    lat: 37.566273,
    lng: 126.974963,
    hasStamp: true,
    isSelected: false,
  },
  spot12: {
    id: 40,
    name: '창경궁 종합안내소 (홍화문)',
    lat: 37.578792,
    lng: 126.996511,
    hasStamp: false,
    isSelected: false,
  },
  spot13: {
    id: 41,
    name: '창경궁 명정전',
    lat: 37.578758,
    lng: 126.99491,
    hasStamp: true,
    isSelected: false,
  },
  spot14: {
    id: 42,
    name: '창경궁 통명전',
    lat: 37.57968,
    lng: 126.99374,
    hasStamp: true,
    isSelected: false,
  },
  spot15: {
    id: 43,
    name: '창경궁 대온실',
    lat: 37.582954,
    lng: 126.994051,
    hasStamp: true,
    isSelected: false,
  },
  spot16: {
    id: 44,
    name: '창경궁 영춘헌',
    lat: 37.579937,
    lng: 126.994799,
    hasStamp: true,
    isSelected: false,
  },
  spot17: {
    id: 51,
    name: '경희궁 숭정문',
    lat: 37.571117,
    lng: 126.968392,
    hasStamp: true,
    isSelected: false,
  },
  spot18: {
    id: 61,
    name: '종묘 정전',
    lat: 37.57488,
    lng: 126.993944,
    hasStamp: true,
    isSelected: false,
  },
  spot19: {
    id: 62,
    name: '종묘 영녕전',
    lat: 37.575926,
    lng: 126.992683,
    hasStamp: true,
    isSelected: false,
  },
};

// 역대 스탬프 투어 스팟 & 종합안내소 모음
const seasonLists = {
  autumn2025: {
    title: '🍁2025 가을 궁중문화축전 스탬프 투어🍁',
    date: '📅 10.8.(수)~10.12.(일) 9:00~18:00',
    place: '🧭 4대궁(경복궁, 창덕궁, 덕수궁, 창경궁) 및 종묘',
    idList: [10, 11, 12, 20, 21, 30, 31, 32, 40, 41, 42, 43, 61, 62],
    finalSpotId: 10,
    minStampCount: 10,
  },
  spring2026: {
    title: '🌸2026 봄 궁중문화축전 스탬프 투어🌸',
    date: '📅 4.25.(토)~5.3.(일) 9:00~18:00',
    place: '🧭 5대궁(경복궁, 창덕궁, 덕수궁, 창경궁, 경희궁) 및 종묘',
    idList: [10, 13, 14, 20, 21, 22, 30, 31, 33, 40, 42, 44, 51, 61],
    finalSpotId: 10,
    minStampCount: 10,
  },
};

export default function App() {
  ////////// VARIABLE //////////

  // 기본 선택 시즌: "2026 봄"
  const [season, setSeason] = useState('spring2026');

  // 선택 시즌에 따른 장소 배열 (지도 영역에 marker 표시 기준)
  const [spots, setSpots] = useState(
    Object.values(placeData).filter((spot) =>
      seasonLists[season].idList.includes(spot.id),
    ),
  );

  // 선택한 장소 배열 (기선택여부 판단 및 순서 포함)
  const [selectedSpots, setSelectedSpots] = useState([]);

  // 최종 장소
  const finalSpot = spots.find(
    (spot) => spot.id === seasonLists[season].finalSpotId,
  );

  ////////// FUNCTION //////////

  useEffect(() => {
    setSpots(
      Object.values(placeData).filter((spot) =>
        seasonLists[season].idList.includes(spot.id),
      ),
    );

    setSelectedSpots([]);
  }, [season]);

  function handleSeason(value) {
    setSeason(value);
  }

  // 장소 선택(isSelected: true) 처리 함수
  function changeIsSelectedTrue(spot) {
    return { ...spot, isSelected: true };
  }

  // Marker Click Function
  function handleAddSpot(clickedSpot) {
    const selectedCount = selectedSpots.length;

    console.log(clickedSpot.name, selectedCount, selectedSpots); // clicked spot right now
    // 0. 스탬프 투어 완성 상태라면, addSpot 기능 중지
    if (selectedCount === seasonLists[season].minStampCount + 2) return;

    // 1-1. 첫 번째 장소는 종합 안내소
    // : 아직 아무 장소도 클릭하지 않음 + 현재 클릭한 장소가 스탬프 스팟
    if (!selectedSpots[0] && clickedSpot.hasStamp) {
      printAlert('📌 첫 번째 장소는 종합 안내소를 선택합니다.');
      return;
    }

    // 1-2. 이후 ONLY hasStamp spot만 추가 가능
    // : 어떤 장소(들)가 이미 클릭됨 + 현재 클릭한 장소가 종합 안내소
    if (selectedSpots[0] && !clickedSpot.hasStamp) {
      printAlert('📌 종합안내소는 첫 번째 장소로만 선택 가능합니다.');
      return;
    }

    // 2. 기존 클릭 장소 리스트에서 삭제
    // : 현재 클릭한 장소(clickedSpot=spot)의 isSelected: true
    if (clickedSpot.isSelected) {
      const confirmCancel = printConfirm('💥 장소를 해제합니다.');

      // Guard Clause
      if (!confirmCancel) return;

      setSpots((spots) =>
        spots.map((spot) =>
          spot.id === clickedSpot.id ? { ...spot, isSelected: false } : spot,
        ),
      );

      setSelectedSpots((selectedSpots) =>
        selectedSpots.filter(
          (selectedSpot) => selectedSpot.id !== clickedSpot.id,
        ),
      );

      return;
    }

    // 3. Marker 클릭 시 작업
    // 3-1. spots 배열 내 clickedSpot과 동일한 spot의 속성값 "isSelected: true" 변경
    setSpots((spots) =>
      spots.map((spot) =>
        spot.id === clickedSpot.id ? changeIsSelectedTrue(spot) : spot,
      ),
    );

    // 3-2. selectedSpots 배열 내 clickedSpot 추가
    setSelectedSpots((selectedSpots) => [
      ...selectedSpots,
      changeIsSelectedTrue(clickedSpot),
    ]);

    // 4. 시작 장소 + 스탬프 10곳 모두 선택 시 최종 장소 추가
    // (※ 단, Array의 길이는 handleAddSpot 함수 종료 후 반영되므로 11이 아닌 10)
    if (selectedCount === seasonLists[season].minStampCount) {
      // 4-1. spots 배열 내 최종 장소 속성값 "isSelected: true"
      setSpots((spots) =>
        spots.map((spot) =>
          spot.id === finalSpot.id ? changeIsSelectedTrue(spot) : spot,
        ),
      );

      // 4-2. selectedSpots 배열 내 최종장소 추가
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
    const confirmReset = printConfirm(message);

    console.log(confirmReset);

    // Guard Clause
    if (!confirmReset) return;

    setSelectedSpots([]);
    setSpots((spots) => spots.map((spot) => ({ ...spot, isSelected: false })));
  }

  return (
    <div className="app">
      <Nav season={season} onChangeSeason={handleSeason} />

      <div className="layout">
        <aside className="aside">
          {selectedSpots[0] ? (
            <SpotList
              selectedSpots={selectedSpots}
              onResetList={handleResetList}
            />
          ) : (
            <Description season={season} seasonLists={seasonLists} />
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
function Nav({ season, onChangeSeason }) {
  return (
    <nav className="nav">
      <img src="logo.png" alt="Logo" className="nav__logo" />
      <select value={season} onChange={(e) => onChangeSeason(e.target.value)}>
        <option value="spring2026">2026 봄 궁중문화축전</option>
        <option value="autumn2025">2025 가을 궁중문화축전 </option>
      </select>
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
