import { useEffect, useRef } from 'react';

// Side Bar Area
export default function SpotList({ selectedSpots, onResetList }) {
  const title = '도장 찍기 순서표';

  const bottomRef = useRef(null); // 참조 변수 생성

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [selectedSpots]); // selectedSpots에 변화 있을 때마다 코드 실행

  return (
    <>
      <h1 className="title">{title}</h1>
      {/* Spot List */}
      <ul className="spot-list">
        {selectedSpots.map((selectedSpot, i) => (
          <Spot selectedSpot={selectedSpot} num={i} key={i} />
        ))}
        <li ref={bottomRef} />
        {/*스크롤 참조 지점 (DOM요소), semantic 구조 따라 ul 내부는 li 태그만!*/}
      </ul>
      <button className="btn-reset" onClick={onResetList}>
        장소 선택 초기화
      </button>
    </>
  );
}

function Spot({ selectedSpot, num }) {
  return (
    <li className={selectedSpot.hasStamp ? 'spot-box' : 'spot-box info-spot'}>
      <h3 className={!selectedSpot.hasStamp ? 'place info-spot' : 'place'}>
        {selectedSpot.hasStamp && (
          <span className="number">{num < 10 ? `0${num}` : num}</span>
        )}
        {selectedSpot.name}
      </h3>
    </li>
  );
}
