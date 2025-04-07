import React, { useContext } from 'react';
import UploadForm from '../components/UploadForm';
import { LanguageContext } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="mb-4">{t('home.title')}</h1>
        
        <p className="mb-4 lead">
          {t('home.description')}
        </p>
        
        <UploadForm />
      </div>
    </div>
  );
};

export default HomePage;