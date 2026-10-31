import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
/* Color Pallete */
:root {
  --color-main: #162a42;
  --color-primary: #2d4059; /* 딥 네이비: 헤더, 푸터, 강조 텍스트 */
  --color-secondary: #ea5455; /* 레드: 스탬프 인증 전용, 알림 */
  --color-bg: #f6f6f6; /* 라이트 그레이: 전체 배경 */
  --color-point: #e5ba73; /* 골드: 완료된 스탬프, 보상, 뱃지 */
  --color-text-dark: #333333; /* 기본 본문 텍스트 */
  --color-white: #ffffff;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: var(--color-text-dark);
  line-height: 1.9;
  background-color: var(--color-bg);
}
`;

export default GlobalStyles;
