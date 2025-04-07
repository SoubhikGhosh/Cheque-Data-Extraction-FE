import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import chequeApi from '../services/api';
import { LanguageContext } from '../context/LanguageContext';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  // Handle file selection from file dialog
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };
  
  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };
  
  // Validate file type and set it if valid
  const validateAndSetFile = (selectedFile) => {
    const validTypes = [
      'application/pdf', 
      'image/jpeg', 
      'image/jpg', 
      'image/png', 
      'image/tiff', 
      'image/tif'
    ];
    
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const isValidExtension = ['pdf', 'jpg', 'jpeg', 'png', 'tiff', 'tif'].includes(fileExtension);
    
    if (validTypes.includes(selectedFile.type) || isValidExtension) {
      setFile(selectedFile);
      setUploadError(null);
    } else {
      setUploadError(
        'Invalid file type. Please upload a PDF, JPG, PNG, or TIFF file.'
      );
      setFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError(t('upload.error.empty'));
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    
    try {
      const response = await chequeApi.uploadCheque(file);
      
      if (response && response.id) {
        setUploadSuccess(t('upload.success') + response.id);
        
        // Clear form
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Navigate to cheque details page after a short delay
        setTimeout(() => {
          navigate(`/cheque/${response.id}`);
        }, 2000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(
        error.response?.data?.detail || 
        'An error occurred during upload. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };
  
  // Prevent default behavior for drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle click on the dropzone
  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{t('upload.title')}</h3>
      </div>
      
      <div className="card-body">
        <form onSubmit={handleSubmit} onDragEnter={handleDrag}>
          <div 
            className={`border border-2 ${dragActive ? 'border-primary' : 'border-dashed'} rounded p-5 text-center mb-4`}
            style={{ cursor: 'pointer' }}
            onClick={handleDropzoneClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.tiff,.tif"
              onChange={handleFileChange}
              className="d-none"
              id="file-upload"
              ref={fileInputRef}
              disabled={isUploading}
            />
            
            <div className="mb-3">
              <i className={`bi bi-cloud-arrow-up fs-1 ${dragActive ? 'text-primary' : 'text-muted'}`}></i>
            </div>
            
            <p className="mb-1 text-muted">
              {file 
                ? `${t('upload.selected')}: ${file.name}` 
                : t('upload.drag')}
            </p>
            
            {file && (
              <p className="small text-muted">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            )}
          </div>
          
          {uploadError && (
            <div className="alert alert-danger" role="alert">
              {uploadError}
            </div>
          )}
          
          {uploadSuccess && (
            <div className="alert alert-success" role="alert">
              {uploadSuccess}
            </div>
          )}
          
          <button
            type="submit"
            className={`btn btn-primary w-100 ${isUploading ? 'disabled' : ''}`}
            disabled={isUploading || !file}
          >
            {isUploading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {t('upload.uploading')}
              </>
            ) : (
              t('upload.button')
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;