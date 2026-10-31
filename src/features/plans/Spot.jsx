import styled, { css } from 'styled-components';

const StyledNumber = styled.span`
  color: var(--color-primary);
  font-size: medium;
  border: 2px solid var(--color-primary);
  padding: 5px 12px;
  margin: 10px;
  border-radius: 20px;
`;

const StyledSpotItem = styled.li`
  border: 0.2rem solid var(--color-primary);
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  border-radius: 2rem;

  ${(props) =>
    props.type === 'info-spot' &&
    css`
      text-align: center;
      color: var(--color-white);
      background-color: var(--color-primary);
    `}
`;

const StyledSpotItemName = styled.h3`
  font-size: 1.5rem;
  color: var(--color-primary);
  /* font-size: medium; */

  ${(props) =>
    props.type === 'info-spot' &&
    css`
      text-align: center;
      color: var(--color-white);
      background-color: var(--color-primary);
    `}
`;

export default function Spot({ selectedSpot, num }) {
  return (
    <StyledSpotItem type={!selectedSpot.hasStamp && 'info-spot'}>
      <StyledSpotItemName type={!selectedSpot.hasStamp && 'info-spot'}>
        {selectedSpot.hasStamp && (
          <StyledNumber>{num < 10 ? `0${num}` : num}</StyledNumber>
        )}
        {selectedSpot.name}
      </StyledSpotItemName>
    </StyledSpotItem>
  );
}
