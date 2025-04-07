import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import ChequeStatus from '../components/ChequeStatus';
import { LanguageContext } from '../context/LanguageContext';

const ChequeDetailPage = () => {
  const { chequeId } = useParams();
  const { t } = useContext(LanguageContext);

  return (
    <div>
      <div className="mb-4">
        <Link to="/cheques" className="btn btn-outline-secondary">
          &larr; {t('cheque.back')}
        </Link>
      </div>
      
      <ChequeStatus />
    </div>
  );
};

export default ChequeDetailPage;