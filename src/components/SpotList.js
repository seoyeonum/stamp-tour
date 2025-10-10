import Spot from './Spot';

export default function SpotList({ selectedSpots }) {
  return (
    <ul className="spot-list">
      {selectedSpots.map((spot, i) => (
        <Spot spot={spot} num={i} key={spot.id} />
      ))}
    </ul>
  );
}
