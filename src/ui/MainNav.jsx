import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
`;

const StyledNavItem = styled.li`
  margin-left: 4rem;
`;

const StyledNavLink = styled(Link)`
  font-size: 1.7rem;
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;
  transition: all 0.3s;
`;

function MainNav() {
  return (
    <StyledNavLinks>
      <StyledNavItem>
        <StyledNavLink to="/about">ABOUT</StyledNavLink>
      </StyledNavItem>
      <StyledNavItem>
        <StyledNavLink to="/plans">PLANS</StyledNavLink>
      </StyledNavItem>
      <StyledNavItem>
        <StyledNavLink to="/tours">TOURS</StyledNavLink>
      </StyledNavItem>
    </StyledNavLinks>
  );
}

export default MainNav;
