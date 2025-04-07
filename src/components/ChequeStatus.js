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

  // Map the new API response structure to our display fields
  const mappedData = {
    bank: extractedData["Bank Name and Details"] || {},
    payee: extractedData["Payee"] || {},
    date: extractedData["Date"] || {},
    account_number: extractedData["Account Number"] || {},
    amount_numerical: extractedData["Amount (Numerical)"] || {},
    amount_words: extractedData["Amount (Words)"] || {},
    cheque_number: extractedData["Cheque Number"] || {},
    routing_number: extractedData["Routing/IFSC Code"] || {},
    micr_line: extractedData["MICR Line"] || {},
    memo: {},  // Not available in new structure
    signature_status: {
      value: cheque.signature_coordinates?.exists ? "Signature present" : "No signature detected",
      confidence: cheque.signature_coordinates?.confidence || 0
    }
  };

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
                {getConfidenceLevel(mappedData.bank.confidence)}
              </div>
              <p>{mappedData.bank.value || 'N/A'}</p>
              {mappedData.bank.reason && (
                <p className="small text-muted">{mappedData.bank.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.payee')}</h5>
                {getConfidenceLevel(mappedData.payee.confidence)}
              </div>
              <p>{mappedData.payee.value || 'N/A'}</p>
              {mappedData.payee.reason && (
                <p className="small text-muted">{mappedData.payee.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.date')}</h5>
                {getConfidenceLevel(mappedData.date.confidence)}
              </div>
              <p>{mappedData.date.value || 'N/A'}</p>
              {mappedData.date.reason && (
                <p className="small text-muted">{mappedData.date.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.amount.num')}</h5>
                {getConfidenceLevel(mappedData.amount_numerical.confidence)}
              </div>
              <p>{mappedData.amount_numerical.value || 'N/A'}</p>
              {mappedData.amount_numerical.reason && (
                <p className="small text-muted">{mappedData.amount_numerical.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.amount.words')}</h5>
                {getConfidenceLevel(mappedData.amount_words.confidence)}
              </div>
              <p>{mappedData.amount_words.value || 'N/A'}</p>
              {mappedData.amount_words.reason && (
                <p className="small text-muted">{mappedData.amount_words.reason}</p>
              )}
            </div>
          </div>
          
          <div className="col-md-6">
            <h4 className="mb-3">Bank Details</h4>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.account.number')}</h5>
                {getConfidenceLevel(mappedData.account_number.confidence)}
              </div>
              <p>{mappedData.account_number.value || 'N/A'}</p>
              {mappedData.account_number.reason && (
                <p className="small text-muted">{mappedData.account_number.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.routing.number')}</h5>
                {getConfidenceLevel(mappedData.routing_number.confidence)}
              </div>
              <p>{mappedData.routing_number.value || 'N/A'}</p>
              {mappedData.routing_number.reason && (
                <p className="small text-muted">{mappedData.routing_number.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.cheque.number')}</h5>
                {getConfidenceLevel(mappedData.cheque_number.confidence)}
              </div>
              <p>{mappedData.cheque_number.value || 'N/A'}</p>
              {mappedData.cheque_number.reason && (
                <p className="small text-muted">{mappedData.cheque_number.reason}</p>
              )}
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.micr')}</h5>
                {getConfidenceLevel(mappedData.micr_line.confidence)}
              </div>
              <p className="font-monospace">{mappedData.micr_line.value || 'N/A'}</p>
              {mappedData.micr_line.reason && (
                <p className="small text-muted">{mappedData.micr_line.reason}</p>
              )}
            </div>
            
            {/* Memo might not be available in new structure */}
            {extractedData["Memo"] && (
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <h5>{t('cheque.memo')}</h5>
                  {getConfidenceLevel(extractedData["Memo"].confidence)}
                </div>
                <p>{extractedData["Memo"].value || 'N/A'}</p>
                {extractedData["Memo"].reason && (
                  <p className="small text-muted">{extractedData["Memo"].reason}</p>
                )}
              </div>
            )}
            
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <h5>{t('cheque.signature')}</h5>
                {getConfidenceLevel(mappedData.signature_status.confidence)}
              </div>
              <p>{mappedData.signature_status.value || 'N/A'}</p>
              {cheque.signature_coordinates?.description && (
                <p className="small text-muted">{cheque.signature_coordinates.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChequeStatus;