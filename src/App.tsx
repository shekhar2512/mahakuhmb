import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import GeneratePass from './pages/GeneratePass';
import CheckStatus from './pages/CheckStatus';
import PaymentGateway from './pages/PaymentGateway';
import QRScanner from './pages/QRScanner';
import CrowdAnalytics from './pages/CrowdAnalytics';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/generate-pass" element={<GeneratePass />} />
          <Route path="/check-status" element={<CheckStatus />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/analytics" element={<CrowdAnalytics />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;