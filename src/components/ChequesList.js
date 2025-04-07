import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import chequeApi from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const ChequesList = () => {
  const [cheques, setCheques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCheques, setTotalCheques] = useState(0);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    fetchCheques();
  }, [offset]);

  const fetchCheques = async () => {
    setLoading(true);
    try {
      const data = await chequeApi.getCheques(limit, offset);
      setCheques(data.cheques);
      setTotalCheques(data.total);
    } catch (error) {
      console.error('Error fetching cheques:', error);
      setError('Failed to load cheques. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const handlePreviousPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const handleNextPage = () => {
    if (offset + limit < totalCheques) {
      setOffset(offset + limit);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (cheques.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <p className="mb-4 text-muted">{t('cheques.empty')}</p>
          <Link to="/" className="btn btn-primary">
            {t('cheques.button.upload')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{t('cheques.list.title')}</h3>
      </div>
      
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>{t('cheques.list.id')}</th>
                <th>{t('cheques.list.filename')}</th>
                <th>{t('cheques.list.bank')}</th>
                <th>{t('cheques.list.payee')}</th>
                <th>{t('cheques.list.amount')}</th>
                <th>{t('cheques.list.date')}</th>
                <th>{t('cheques.list.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {cheques.map((cheque) => (
                <tr key={cheque.id}>
                  <td>{cheque.id}</td>
                  <td className="text-truncate" style={{maxWidth: '150px'}}>{cheque.filename}</td>
                  <td className="text-truncate" style={{maxWidth: '150px'}}>{cheque.bank || 'N/A'}</td>
                  <td className="text-truncate" style={{maxWidth: '150px'}}>{cheque.payee || 'N/A'}</td>
                  <td>{cheque.amount || 'N/A'}</td>
                  <td>{formatDate(cheque.processing_timestamp)}</td>
                  <td>
                    <Link to={`/cheque/${cheque.id}`} className="btn btn-sm btn-outline-primary">
                      {t('cheques.list.view')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalCheques > limit && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Showing {offset + 1} - {Math.min(offset + limit, totalCheques)} of {totalCheques}
            </div>
            <div className="btn-group">
              <button 
                className="btn btn-outline-secondary" 
                onClick={handlePreviousPage}
                disabled={offset === 0}
              >
                Previous
              </button>
              <button 
                className="btn btn-outline-secondary" 
                onClick={handleNextPage}
                disabled={offset + limit >= totalCheques}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChequesList;