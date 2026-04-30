export default function Description({ season, seasonLists }) {
  const selectedSeason = seasonLists[season];

  const title = selectedSeason.title;
  const date = selectedSeason.date;
  const place = selectedSeason.place;
  const minStampCount = selectedSeason.minStampCount;
  const siteUrl = 'https://www.kh.or.kr/fest';
  const subTitle = '📌 이용 안내';
  const textGuideline = [
    `① 지도에서 도장이 비치된 장소를 눌러 순서표에 장소를 추가합니다.`,
    `② 시작 장소는 종합안내소를 선택합니다.`,
    `③ 완주 기념품 수령처는 스탬프 투어 스팟 ${minStampCount}곳을 모두 추가 시 자동으로 순서표에 추가됩니다.`,
    `④ 아래 '장소 재설정' 버튼을 클릭하면 목록이 초기화됩니다.`,
  ];

  return (
    <>
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
          {textGuideline.map((text, i) => (
            <li key={i}>{text}</li> // 각 리스트(li)에 key 추가
          ))}
        </ul>
      </div>
    </>
  );
}
