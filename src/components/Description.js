export default function Description() {
  const title = '2025 가을 궁중문화축전 스탬프 투어';
  const date = '📅 10.8.(수)~10.12.(일) 9:00~18:00';
  const place = '🧭 4대궁(경복궁, 창덕궁, 덕수궁, 창경궁) 및 종묘';
  const siteUrl = 'https://www.kh.or.kr/fest';

  const subTitle = '📌 이용 안내';
  const textGuideline = [
    '① 지도에서 도장이 비치된 장소를 눌러 순서표에 장소를 추가합니다.',
    '② 시작 장소는 종합관리소를 선택합니다.',
    '③ 완주 기념품 수령처(경복궁 종합관리소)는 스탬프 투어 스팟 10곳을 모두 추가 시 자동으로 순서표에 추가됩니다.',
    "④ 아래 '장소 재설정' 버튼을 클릭하면 목록이 초기화됩니다.",
  ];

  return (
    <aside className="aside">
      <h1 className="title">{title}</h1>
      <div className="section">
        <h2 className="date">{date} </h2>
        <h3 className="place">{place}</h3>
        <p>
          해당 페이지는 {title} 스팟을 한눈에 파악하는데 도움이 되고자
          만들어졌습니다.
          <br />
          공식 운영 홈페이지가 아니며, 정확한 정보는{' '}
          <a href={siteUrl}>궁중문화축전 홈페이지</a>를 참고하시기 바랍니다.
        </p>
      </div>
      <div className="section">
        <h2 className="guideline">{subTitle}</h2>
        <ul className="spot-list">
          {textGuideline.map((text) => (
            <li>{text}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
