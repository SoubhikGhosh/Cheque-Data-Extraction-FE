import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const SignatureViewer = ({ signatureUrl }) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useContext(LanguageContext);

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="signature-viewer p-3 border rounded text-center">
        <p className="text-muted">
          No signature image available
        </p>
      </div>
    );
  }

  return (
    <div className="signature-viewer">
      <h5>{t('cheque.signature')}</h5>
      <div className="p-3 border rounded mb-2">
        <img 
          src={signatureUrl} 
          alt="Signature" 
          className="img-fluid" 
          style={{ maxHeight: '150px' }}
          onError={handleImageError}
        />
      </div>
      <a 
        href={signatureUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-sm btn-outline-secondary"
      >
        {t('cheque.view.signature')}
      </a>
    </div>
  );
};

export default SignatureViewer;