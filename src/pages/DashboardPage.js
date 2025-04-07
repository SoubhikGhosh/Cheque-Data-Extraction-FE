import React, { useContext } from 'react';
import Dashboard from '../components/Dashboard';
import { LanguageContext } from '../context/LanguageContext';

const DashboardPage = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <h1 className="mb-4">{t('dashboard.title')}</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;