import { Outlet } from 'react-router-dom';
import Header from './Header';

function AppLayout() {
  return (
    <div>
      <Header />
      {/* <div>SIDEBAR</div> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
