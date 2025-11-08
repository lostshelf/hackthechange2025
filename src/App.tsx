import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Home'; 
import LandingPage from './pages/Landing';
import LoginPage from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/contact" element={<LoginPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;