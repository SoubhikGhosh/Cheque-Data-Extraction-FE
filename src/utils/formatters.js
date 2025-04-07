// Format date to a human-readable format
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Format file size
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Format confidence level
  export const formatConfidence = (confidence) => {
    if (confidence === undefined || confidence === null) return 'N/A';
    return (confidence * 100).toFixed(1) + '%';
  };
  
  // Get confidence class
  export const getConfidenceClass = (confidence) => {
    if (confidence === undefined || confidence === null) return '';
    
    if (confidence >= 0.8) {
      return 'text-success';
    } else if (confidence >= 0.5) {
      return 'text-warning';
    } else {
      return 'text-danger';
    }
  };
  
  // Format currency
  export const formatCurrency = (amount, currency = 'USD') => {
    if (!amount) return 'N/A';
    
    try {
      const numAmount = parseFloat(amount.toString().replace(/[^0-9.]/g, ''));
      
      if (isNaN(numAmount)) return amount;
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(numAmount);
    } catch (e) {
      return amount;
    }
  };