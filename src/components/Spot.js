export default function Spot({ spot, num }) {
  return (
    <li className={spot.hasStamp ? 'spot-box' : 'spot-box info-spot'}>
      <h3 className={!spot.hasStamp && 'info-spot'}>
        {spot.hasStamp && (
          <span className="number">{num < 10 ? `0${num}` : num}</span>
        )}
        {spot.name}
      </h3>
    </li>
  );
}
