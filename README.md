# 🍁 Stamp Tour

<img src="./assets/1.select_spot.JPG" alt="Stamp Tour 프로젝트 캡처" width="600"/>

## 🎯 프로젝트 소개

- React 를 기반으로 하는 클라이언트 사이드 웹 어플리케이션
- 스탬프 투어 스팟 위치를 지도 위에 표시하여 보여주고, 사용자가 선택한 스팟을 순서표로 만들어 한눈에 파악하도록 돕는 프로그램

### 배포 링크

[stamp-tour-amber.vercel.app](stamp-tour-amber.vercel.app)

### 개발 목표

1. JavaScript 에 대한 기초 학습과 React 라이브러리를 기반으로 component, props, state 를 활용한 프로젝트를 진행해보자.
2. 스탬프 투어 일정을 순서표와 지도 모두에 표시하고, 사용자가 필요한 장소를 한눈에 파악하도록 도와보자.
3. 누구나 접근 가능한 클라이언트 사이드 웹 어플리케이션을 구현하고 배포해보자.

### 개발 기간

- (개발) 2025.10.03. ~ 2025.10.10. (8 days)
- (배포 및 유지/보수) 2025.10.15. ~ 현재 진행 중

### 개발 인원

- 1명 (본인)

## 📁 파일 구조

```
stamp-tour
 ├ public/
 │  ├ index.html
 │  └ ...
 ├ src/
 │  ├ index.js
 │  ├ index.css
 │  └ components/
 │    ├ App.js
 │    ├ SideBar.js
 │    ├ StampMap.js
 │    └ ...
 ├ ...
 └ README.md
```

## 📚 사용 기술

### Frontend

- JavaScript, HTML, CSS: 웹 페이지의 기본 구조와 스타일 구성 및 사용자와 상호작용하는 동적 기능 구현
- React: component 와 JSX 의 사용으로 동일 코드의 반복을 줄이고 가독성을 향상, 웹 어플리케이션을 비교적 빠르게 구현

### Tools

- Git, GitHub: 버전 관리와 코드 변경 이력 추적, 원격 저장소를 활용한 코드 작업 접근성 향상
- node.js: Node Package Manager 를 통하여 개발용 로컬 서버 (live-server)를 활용
- Vercel: GitHub 저장소와 연계한 어플리케이션 배포 및 빌드 지원
- Visual Studio Code : JavaScript 기반 프로젝트의 코드 작성·실행·디버깅 지원

## ✨ 주요 기능

- 종합안내소 및 스탬프 투어 스팟 출력 기능
- 선택 가능한 스팟 제한 기능
- 스탬프 투어 일정 구성 기능 (순서표, 지도)

## 🚀 실행 방법

### 1. 배포 버전

다음 링크([stamp-tour-amber.vercel.app](stamp-tour-amber.vercel.app))에서 확인 가능

### 2. 로컬 실행

```
git clone https://github.com/seoyeonum/stamp-tour.git
cd stamp-tour
npm install
npm start
```

## 💭 회고

### 상상한 것을 구현해내는 성취감

- React 학습 이후 첫 개인 프로젝트를 진행하였다.
- 문득 ‘이런 웹페이지가 있으면 편리할텐데’ 하고 **상상했던 것을 전부 구현**해냈을 때의 **성취감**이 좋았다.
- React 학습 및 React 관련 라이브러리에 대한 탐색을 이어나가며, 꾸준한 유지 보수를 통해 더 나은 웹페이지를 만들고 싶다.

### 언제 어디서나 접근 가능한 웹페이지

- **Vercel** 을 활용하여 처음으로 웹 애플리케이션 배포를 진행하였다.
- 사용자가 직접 파일을 다운로드 받고 실행 환경을 구성하지 않더라도 도메인을 통해 **웹페이지에 쉽게 접근**하고 이를 활용할 수 있게 되었다.
