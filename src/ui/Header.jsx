import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  flex-shrink: 0; /* 0: 화면이 작아져도 요소 표시 */
  padding: 0 2rem;
  background-color: var(--color-main);
  color: var(--color-white);
`;

function Header() {
  return (
    <StyledHeader>
      <Logo />
      <MainNav />
    </StyledHeader>
  );
}

export default Header;
