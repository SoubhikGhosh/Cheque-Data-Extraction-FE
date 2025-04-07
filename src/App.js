import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ChequesPage from './pages/ChequesPage';
import ChequeDetailPage from './pages/ChequeDetailPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { LanguageContext } from './context/LanguageContext';
import './assets/css/App.css';
import './assets/css/dark-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Main App content with language context
function AppContent() {
  const { t } = useContext(LanguageContext);
  
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="container main-content py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cheques" element={<ChequesPage />} />
            <Route path="/cheque/:chequeId" element={<ChequeDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;