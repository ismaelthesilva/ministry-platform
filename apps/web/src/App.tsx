import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';

{/* Pages with Navbar */}
import Home from './pages/Home';
import Revelation from './pages/Revelation';
import Revelation1 from './pages/Revelation/Revelation1';
import Revelation2 from './pages/Revelation/Revelation2';
import Revelation3 from './pages/Revelation/Revelation3';
import Revelation4 from './pages/Revelation/Revelation4';
import Revelation5 from './pages/Revelation/Revelation5';
import Revelation6 from './pages/Revelation/Revelation6';
import Revelation7 from './pages/Revelation/Revelation7';
import Revelation8 from './pages/Revelation/Revelation8';
import Revelation9 from './pages/Revelation/Revelation9';
import Revelation10 from './pages/Revelation/Revelation10';
import Revelation11 from './pages/Revelation/Revelation11';
import Revelation12 from './pages/Revelation/Revelation12';
import Revelation13 from './pages/Revelation/Revelation13';
import Revelation14 from './pages/Revelation/Revelation14';
import Revelation15 from './pages/Revelation/Revelation15';
import Revelation16 from './pages/Revelation/Revelation16';
import Revelation17 from './pages/Revelation/Revelation17';
import Revelation18 from './pages/Revelation/Revelation18';
import Revelation19 from './pages/Revelation/Revelation19';
import Revelation20 from './pages/Revelation/Revelation20';
import Revelation21 from './pages/Revelation/Revelation21';
import Revelation22 from './pages/Revelation/Revelation22';

{/* Pages without Navbar */}
import FitnessBR from './pages/landingPages/forms/FitnessBR';
import Anglican from './pages/landingPages/anglican/nwayouth';
import NwaReportTerm2 from './pages/landingPages/anglican/nwa-report-term2';

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
            <Route path="/revelation/2" element={<Revelation2 />} />
            <Route path="/revelation/3" element={<Revelation3 />} />
            <Route path="/revelation/4" element={<Revelation4 />} />
            <Route path="/revelation/5" element={<Revelation5 />} />
            <Route path="/revelation/6" element={<Revelation6 />} />
            <Route path="/revelation/7" element={<Revelation7 />} />
            <Route path="/revelation/8" element={<Revelation8 />} />
            <Route path="/revelation/9" element={<Revelation9 />} />
            <Route path="/revelation/10" element={<Revelation10 />} />
            <Route path="/revelation/11" element={<Revelation11 />} />
            <Route path="/revelation/12" element={<Revelation12 />} />
            <Route path="/revelation/13" element={<Revelation13 />} />
            <Route path="/revelation/14" element={<Revelation14 />} />
            <Route path="/revelation/15" element={<Revelation15 />} />
            <Route path="/revelation/16" element={<Revelation16 />} />
            <Route path="/revelation/17" element={<Revelation17 />} />
            <Route path="/revelation/18" element={<Revelation18 />} />
            <Route path="/revelation/19" element={<Revelation19 />} />
            <Route path="/revelation/20" element={<Revelation20 />} />
            <Route path="/revelation/21" element={<Revelation21 />} />
            <Route path="/revelation/22" element={<Revelation22 />} />
          </Route>

          {/* Pages without Navbar */}
          <Route element={<LayoutWithoutNavbar />}>
            <Route path="/fitnessbr" element={<FitnessBR />} />
            <Route path="/nwayouth" element={<Anglican />} />
            <Route path="/nwa-report-term2" element={<NwaReportTerm2 />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;