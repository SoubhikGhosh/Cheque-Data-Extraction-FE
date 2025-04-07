import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import chequeApi from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import SignatureViewer from './SignatureViewer';

const ChequeStatus = () => {
  const { chequeId } = useParams();
  const [cheque, setCheque] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    fetchChequeDetails();
  }, [chequeId]);

  const fetchChequeDetails = async () => {
    setLoading(true);
    try {
      const data = await chequeApi.getChequeDetails(chequeId);
      setCheque(data);
    } catch (error) {
      console.error('Error fetching cheque details:', error);
      setError('Failed to load cheque details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getConfidenceLevel = (confidence) => {
    if (confidence === undefined || confidence === null) return '';
    
    if (confidence >= 0.8) {
      return <span className="badge bg-success">{t('confidence.high')} ({(confidence * 100).toFixed(1)}%)</span>;
    } else if (confidence >= 0.5) {
      return <span className="badge bg-warning text-dark">{t('confidence.medium')} ({(confidence * 100).toFixed(1)}%)</span>;
    } else {
      return <span className="badge bg-danger">{t('confidence.low')} ({(confidence * 100).toFixed(1)}%)</span>;
    }
  };

  const handleImageError = () => {
    setImageError(true);
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

  if (!cheque) {
    return (
      <div className="alert alert-warning" role="alert">
        Cheque not found. Please check the ID.
      </div>
    );
  }

  const extractedData = cheque.extracted_data || {};
  const originalImageUrl = chequeApi.getChequeImageUrl(chequeId);
  const signatureImageUrl = chequeApi.getSignatureImageUrl(chequeId);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title mb-0">{t('cheque.title')}</h3>
      </div>
      
      <div className="card-body">
        {/* Image Section */}
        <div className="mb-4 text-center">
          {!imageError ? (
            <img 
              src={originalImageUrl} 
              alt="Original Cheque" 
              className="img-fluid rounded shadow-sm mb-3" 
              style={{ maxHeight: '400px', objectFit: 'contain' }}
              onError={handleImageError}
            />
          ) : (
            <div className="alert alert-warning">
              The original cheque image could not be loaded.
            </div>
          )}
        </div>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="mb-3">
              <h5>{t('cheque.id')}</h5>
              <p>{cheque.id}</p>
            </div>
            
            <div className="mb-3">
              <h5>{t('cheques.list.filename')}</h5>
              <p>{cheque.filename}</p>
            </div>
            
            <div className="mb-3">
              <h5>{t('cheque.processed')}</h5>
              <p>{formatDate(cheque.processing_timestamp)}</p>
            </div>
          </div>
          
          <div className="col-md-6 text-center">
            <SignatureViewer signatureUrl={signatureImageUrl} />
          </div>
        </div>
        
        <hr />
        
        <div className="row">
          <div className="col-md-6">
            <h4 className="mb-3">Basic Information</h4>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.bank')}</h5>
                {getConfidenceLevel(extractedData.bank_details?.confidence)}
              </div>
              <p>{extractedData.bank_details?.value || 'N/A'}</p>
              {extractedData.bank_details?.reason && (
                <p className="small text-muted">{extractedData.bank_details.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.payee')}</h5>
                {getConfidenceLevel(extractedData.payee?.confidence)}
              </div>
              <p>{extractedData.payee?.value || 'N/A'}</p>
              {extractedData.payee?.reason && (
                <p className="small text-muted">{extractedData.payee.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.date')}</h5>
                {getConfidenceLevel(extractedData.date?.confidence)}
              </div>
              <p>{extractedData.date?.value || 'N/A'}</p>
              {extractedData.date?.reason && (
                <p className="small text-muted">{extractedData.date.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.amount.num')}</h5>
                {getConfidenceLevel(extractedData.amount_numerical?.confidence)}
              </div>
              <p>{extractedData.amount_numerical?.value || 'N/A'}</p>
              {extractedData.amount_numerical?.reason && (
                <p className="small text-muted">{extractedData.amount_numerical.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.amount.words')}</h5>
                {getConfidenceLevel(extractedData.amount_words?.confidence)}
              </div>
              <p>{extractedData.amount_words?.value || 'N/A'}</p>
              {extractedData.amount_words?.reason && (
                <p className="small text-muted">{extractedData.amount_words.reason}</p>
              )}
            </div>
          </div>
          
          <div className="col-md-6">
            <h4 className="mb-3">Bank Details</h4>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.account.number')}</h5>
                {getConfidenceLevel(extractedData.account_number?.confidence)}
              </div>
              <p>{extractedData.account_number?.value || 'N/A'}</p>
              {extractedData.account_number?.reason && (
                <p className="small text-muted">{extractedData.account_number.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.routing.number')}</h5>
                {getConfidenceLevel(extractedData.routing_number?.confidence)}
              </div>
              <p>{extractedData.routing_number?.value || 'N/A'}</p>
              {extractedData.routing_number?.reason && (
                <p className="small text-muted">{extractedData.routing_number.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.cheque.number')}</h5>
                {getConfidenceLevel(extractedData.cheque_number?.confidence)}
              </div>
              <p>{extractedData.cheque_number?.value || 'N/A'}</p>
              {extractedData.cheque_number?.reason && (
                <p className="small text-muted">{extractedData.cheque_number.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.micr')}</h5>
                {getConfidenceLevel(extractedData.micr_line?.confidence)}
              </div>
              <p className="font-monospace">{extractedData.micr_line?.value || 'N/A'}</p>
              {extractedData.micr_line?.reason && (
                <p className="small text-muted">{extractedData.micr_line.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.memo')}</h5>
                {getConfidenceLevel(extractedData.memo?.confidence)}
              </div>
              <p>{extractedData.memo?.value || 'N/A'}</p>
              {extractedData.memo?.reason && (
                <p className="small text-muted">{extractedData.memo.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.signature')}</h5>
                {getConfidenceLevel(extractedData.signature_status?.confidence)}
              </div>
              <p>{extractedData.signature_status?.value || 'N/A'}</p>
              {extractedData.signature_status?.reason && (
                <p className="small text-muted">{extractedData.signature_status.reason}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChequeStatus;