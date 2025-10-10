// Header Area
export default function Logo() {
  const title = '2025 가을 궁중문화축전 스탬프 투어';
  const date = '📅 10.8.(수)~10.12.(일) 9:00~18:00';
  const place = '🧭 4대궁(경복궁, 창덕궁, 덕수궁, 창경궁) 및 종묘';
  const siteUrl = 'https://www.kh.or.kr/fest';

  return (
    <header>
      <h1>{title}</h1>
      <b>
        {date} / {place}
      </b>
      <p>
        해당 페이지는 {title} 스팟을 한눈에 파악하는데 도움이 되고자
        만들어졌습니다.
        <br />
        공식 운영 홈페이지가 아니며, 정확한 정보는{' '}
        <a href={siteUrl}>궁중문화축전 홈페이지</a>를 참고하시기 바랍니다.
      </p>
    </header>
  );
}
