import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ChequesList from '../components/ChequesList';
import { LanguageContext } from '../context/LanguageContext';

const ChequesPage = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">{t('cheques.title')}</h1>
        <Link to="/" className="btn btn-primary">
          {t('cheques.button.upload')}
        </Link>
      </div>
      
      <ChequesList />
    </div>
  );
};

export default ChequesPage;