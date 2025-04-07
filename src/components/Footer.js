import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useContext(LanguageContext);
  
  return (
    <footer className="bg-light py-3 border-top mt-auto">
      <div className="container text-center text-muted">
        {t('footer.copyright')} {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;