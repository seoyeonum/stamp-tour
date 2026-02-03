// Side Bar Area
export default function SpotList({ selectedSpots, onResetList }) {
  const title = '도장 찍기 순서표';
  return (
    // <aside className="aside side-bar">
    <aside className="aside">
      <h1 className="title">{title}</h1>
      {/* Spot List */}
      <ul className="spot-list">
        {selectedSpots.map((spot, i) => (
          <Spot spot={spot} num={i} key={spot.id} />
        ))}
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
