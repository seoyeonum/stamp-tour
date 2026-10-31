import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Plan from './pages/Plans';
import About from './pages/About';
import Tours from './pages/Tours';
import AppLayout from './ui/AppLayout';
import GlobalStyles from '../src/styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="about" />} />
            <Route path="about" element={<About />} />
            <Route path="plans" element={<Plan />} />
            <Route path="tours" element={<Tours />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
