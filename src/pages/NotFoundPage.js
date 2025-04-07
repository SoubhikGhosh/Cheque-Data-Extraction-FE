import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';

const NotFoundPage = () => {
  const { t } = useContext(LanguageContext);

  return (
    <div className="text-center py-5">
      <h1 className="display-1 fw-bold">{t('404.title')}</h1>
      <p className="fs-4 mb-4">{t('404.message')}</p>
      <Link to="/" className="btn btn-primary">
        {t('404.button')}
      </Link>
    </div>
  );
};

export default NotFoundPage;