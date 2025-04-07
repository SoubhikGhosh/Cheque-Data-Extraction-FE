import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LanguageContext } from '../context/LanguageContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm btn-outline-light"
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      {theme === 'light' ? (
        <>
          <i className="bi bi-moon-fill me-1"></i>
          {t('theme.dark')}
        </>
      ) : (
        <>
          <i className="bi bi-sun-fill me-1"></i>
          {t('theme.light')}
        </>
      )}
    </button>
  );
};

export default ThemeToggle;