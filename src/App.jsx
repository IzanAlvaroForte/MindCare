import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Services from './pages/Services';
import Files from './pages/Files';
import Settings from './pages/Settings';
import SignUpIn from './pages/SignUpIn';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signupin" element={<SignUpIn />} />
        <Route path="/*" element={
          <section className="flex w-full h-screen">
            <Sidebar />
            <div className="h-full w-3/4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/services" element={<Services />} />
                <Route path="/files" element={<Files />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </section>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;