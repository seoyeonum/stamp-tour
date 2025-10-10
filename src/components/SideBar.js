import GuideLine from './GuideLine';
import Reset from './Reset';
import SpotList from './SpotList';

// Side Bar Area
export default function SideBar({ spots, selectedSpots, count, onResetList }) {
  const title = '도장 찍기 순서표';
  const subTitle = '📌 이용 안내';
  const textGuideline = [
    '① 지도에서 도장이 비치된 장소를 눌러 순서표에 장소를 추가합니다.',
    '② 시작 장소는 종합관리소를 선택합니다.',
    '③ 완주 기념품 수령처(경복궁 종합관리소)는 스탬프 투어 스팟 10곳을 모두 추가 시 자동으로 순서표에 추가됩니다.',
    "④ 아래 '장소 재설정' 버튼을 클릭하면 목록이 초기화됩니다.",
  ];
  return (
    <aside className="side-bar">
      <h2>{title}</h2>

      {count === 0 && (
        <GuideLine subTitle={subTitle} textGuideline={textGuideline} />
      )}

      <SpotList spots={spots} selectedSpots={selectedSpots} count={count} />
      <Reset onResetList={onResetList} />
    </aside>
  );
}
