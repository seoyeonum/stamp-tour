import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const StyledApp = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  flex: 1;
  min-height: 0;
  //   overflow-y: auto;
`;

function AppLayout() {
  return (
    <StyledApp>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledApp>
  );
}

export default AppLayout;
