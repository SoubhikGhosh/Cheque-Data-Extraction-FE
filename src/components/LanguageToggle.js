import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-sm btn-outline-light"
      aria-label={t('language.toggle')}
      title={t('language.toggle')}
    >
      {language === 'en' ? (
        <>
          <span className="me-1">🇮🇳</span> {t('language.hi')}
        </>
      ) : (
        <>
          <span className="me-1">🇬🇧</span> {t('language.en')}
        </>
      )}
    </button>
  );
};

export default LanguageToggle;