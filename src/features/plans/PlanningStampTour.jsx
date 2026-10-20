import { useEffect, useState } from 'react';

import Description from './Description';
import StampMap from './StampMap';
import SpotList from './SpotList';
import SelectSeason from './SelectSeason';
import { placeData, seasonLists } from '../../data/stamp-data';
import { printAlert, printConfirm } from '../../utils/helper';

function PlanningStampTour() {
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

  // tab title 변경
  useEffect(
    function () {
      if (!season) return;
      document.title = `${seasonLists[season].title}`;

      // cleanup function
      return function () {
        document.title = '궁중문화축전 스탬프 투어';
      };
    },
    [season],
  );

  // season에 따른 spot 선별 및 선택 항목 초기화
  useEffect(() => {
    setSpots(
      Object.values(placeData).filter((spot) =>
        seasonLists[season].idList.includes(spot.id),
      ),
    );

    setSelectedSpots([]);
  }, [season]);

  // season 변경
  function handleSeason(value) {
    setSeason(value);
  }

  // 장소 선택(isSelected: true) 처리 함수
  function changeIsSelectedTrue(spot) {
    return { ...spot, isSelected: true };
  }

  // 장소 선택 처리 및 selectedSpots 에 추가
  function addSpot(clickedSpot) {
    // spots 배열 내 clickedSpot과 동일한 spot의 속성값 "isSelected: true" 변경
    setSpots((spots) =>
      spots.map((spot) =>
        spot.id === clickedSpot.id ? changeIsSelectedTrue(spot) : spot,
      ),
    );

    // selectedSpots 배열 내 clickedSpot 추가
    setSelectedSpots((selectedSpots) => [
      ...selectedSpots,
      changeIsSelectedTrue(clickedSpot),
    ]);
  }

  // 최종 장소 추가
  function addFinalSpot() {
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

  // 클릭한 장소 선택 해제 및 selectedSpots에서 삭제
  function removeSpot(clickedSpot, selectedCount) {
    setSpots((spots) =>
      spots.map((spot) =>
        spot.id === clickedSpot.id ? { ...spot, isSelected: false } : spot,
      ),
    );

    setSelectedSpots((selectedSpots) => {
      const filteredSpots = selectedSpots.filter(
        (selectedSpot) => selectedSpot.id !== clickedSpot.id,
      );

      const removeFinalSpot =
        selectedCount !== 1 && filteredSpots.at(-1)?.id === finalSpot.id;

      return removeFinalSpot ? filteredSpots.slice(0, -1) : filteredSpots;
    });
  }

  // Marker 클릭 함수
  function handleClickedMarker(clickedSpot) {
    const selectedCount = selectedSpots.length;

    // 0. 스탬프 투어 완성 상태라면, addSpot 기능 중지
    // if (selectedCount === seasonLists[season].minStampCount + 2) return;

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

    // 2. 장소 중복 클릭(리스트에서 삭제)
    if (clickedSpot.isSelected) {
      const confirmCancel = printConfirm('💥 장소를 해제합니다.');

      // Guard Clause
      if (!confirmCancel) return;

      removeSpot(clickedSpot, selectedCount);
      return;
    }

    // 3. 클릭 장소 선택 처리 및 selectedSpots에 추가
    addSpot(clickedSpot);

    // 4. 시작 장소 + 스탬프 장소 모두 선택 시 최종 장소 추가
    // (※ 단, Array의 길이는 handleClickedMarker 함수 종료 후 반영되므로 seasonLists[season].minStampCount와)
    if (selectedCount === seasonLists[season].minStampCount) {
      addFinalSpot();
    }
  }

  // 순서표 초기화 함수
  function handleResetList() {
    const message = '⚠ 선택한 순서표를 초기화합니다. ⚠';
    const confirmReset = printConfirm(message);

    // Guard Clause
    if (!confirmReset) return;

    setSelectedSpots([]);
    setSpots((spots) => spots.map((spot) => ({ ...spot, isSelected: false })));
  }

  return (
    <>
      <StampMap
        spots={spots}
        onAddSpot={handleClickedMarker}
        selectedSpots={selectedSpots}
      />

      <div className="aside">
        <SelectSeason season={season} onChangeSeason={handleSeason} />
        {selectedSpots[0] ? (
          <SpotList
            selectedSpots={selectedSpots}
            onResetList={handleResetList}
          />
        ) : (
          <Description season={season} seasonLists={seasonLists} />
        )}
      </div>
    </>
  );
}

export default PlanningStampTour;
