import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import chequeApi from '../services/api';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { LanguageContext } from '../context/LanguageContext';

const Header = () => {
  const [healthStatus, setHealthStatus] = useState('checking');
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    checkApiHealth();
    
    // Check health status every 30 seconds
    const interval = setInterval(checkApiHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await chequeApi.checkHealth();
      setHealthStatus(response.status);
    } catch (error) {
      setHealthStatus('unhealthy');
      console.error('Health check failed:', error);
    }
  };

  return (
    <header className="bg-dark text-white p-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <h1 className="h4 mb-0">{t('app.title')}</h1>
          </div>
          
          <div className="col-md-8">
            <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-md-center">
              <nav className="mb-2 mb-md-0 me-md-4">
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/" className="nav-link text-white">{t('nav.home')}</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cheques" className="nav-link text-white">{t('nav.cheques')}</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link text-white">{t('nav.dashboard')}</Link>
                  </li>
                </ul>
              </nav>
              
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center me-3">
                  <span className="me-2 small">{t('api.status')}</span>
                  <span className={`d-inline-block rounded-circle ${
                    healthStatus === 'healthy' ? 'bg-success' : 
                    healthStatus === 'checking' ? 'bg-warning' : 'bg-danger'
                  }`} style={{ width: '10px', height: '10px' }}></span>
                </div>
                
                <div className="d-flex gap-2">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;