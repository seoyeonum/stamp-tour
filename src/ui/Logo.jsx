import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled(Link)`
  height: 5.25rem;
`;

const StyledLogoImage = styled.img`
  height: 4.5rem;
  transition: all 0.3s;
`;

function Logo() {
  return (
    <StyledLogo to="/">
      <StyledLogoImage src="logo.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
