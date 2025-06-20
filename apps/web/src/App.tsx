import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FitnessBR from './pages/landingPages/forms/FitnessBR';
import Revelation from './pages/Revelation';
import Revelation1 from './pages/Revelation/Revelation1';


const LayoutWithNavbar: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const LayoutWithoutNavbar: React.FC = () => {
  return <Outlet />;
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Pages with Navbar */}
          <Route element={<LayoutWithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/revelation" element={<Revelation />} />
            <Route path="/revelation/1" element={<Revelation1 />} />
          </Route>

          {/* Pages without Navbar */}
          <Route element={<LayoutWithoutNavbar />}>
            <Route path="/fitnessbr" element={<FitnessBR />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;