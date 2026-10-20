import { seasonLists } from '../../data/stamp-data';

// TOP NAVIGATION
export default function SelectSeason({ season, onChangeSeason }) {
  return (
    <select value={season} onChange={(e) => onChangeSeason(e.target.value)}>
      <option value="spring2026">
        {seasonLists['spring2026'].title.slice(2, -9)}
      </option>
      <option value="autumn2025">
        {seasonLists['autumn2025'].title.slice(2, -9)}
      </option>
    </select>
  );
}
