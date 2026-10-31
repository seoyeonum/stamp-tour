import { useEffect, useRef } from 'react';
import Spot from './Spot';
import styled from 'styled-components';

const StyleTitle = styled.h1`
  font-size: 1.8rem;
`;

const StyledSpotList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledButtonReset = styled.button`
  text-align: center;
  color: var(--color-white);
  background-color: var(--color-primary);
  padding: 0px 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 2px solid var(--color-primary);

  &:hover {
    background-color: var(--color-secondary);
    border: 2px solid var(--color-secondary);
  }
`;

// Side Bar Area
export default function SpotList({ selectedSpots, onResetList }) {
  const title = '도장 찍기 순서표';

  const bottomRef = useRef(null); // 참조 변수 생성

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [selectedSpots]); // selectedSpots에 변화 있을 때마다 코드 실행

  return (
    <>
      <StyleTitle>{title}</StyleTitle>
      {/* Spot List */}
      <StyledSpotList>
        {selectedSpots.map((selectedSpot, i) => (
          <Spot selectedSpot={selectedSpot} num={i} key={i} />
        ))}
        <li ref={bottomRef} />
        {/*스크롤 참조 지점 (DOM요소), semantic 구조 따라 ul 내부는 li 태그만!*/}
      </StyledSpotList>
      <StyledButtonReset onClick={onResetList}>
        장소 선택 초기화
      </StyledButtonReset>
    </>
  );
}
