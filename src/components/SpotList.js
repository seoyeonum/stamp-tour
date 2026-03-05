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
    // <aside className="aside side-bar">
    <aside className="aside">
      <h1 className="title">{title}</h1>
      {/* Spot List */}
      <ul className="spot-list">
        {selectedSpots.map((spot, i) => (
          <Spot spot={spot} num={i} key={spot.id} />
        ))}
        <li ref={bottomRef} />
        {/*스크롤 참조 지점 (DOM요소), semantic 구조 따라 ul 내부는 li 태그만!*/}
      </ul>
      <button className="btn-reset" onClick={onResetList}>
        장소 선택 초기화
      </button>
    </aside>
  );
}

function Spot({ spot, num }) {
  return (
    <li className={spot.hasStamp ? 'spot-box' : 'spot-box info-spot'}>
      <h3 className={!spot.hasStamp ? 'place info-spot' : 'place'}>
        {spot.hasStamp && (
          <span className="number">{num < 10 ? `0${num}` : num}</span>
        )}
        {spot.name}
      </h3>
    </li>
  );
}
