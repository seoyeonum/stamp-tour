export default function Spot({ selectedSpot, num }) {
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
