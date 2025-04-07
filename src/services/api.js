import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://localhost:8001';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// API functions for cheque processing
const chequeApi = {
  // Upload cheque file
  uploadCheque: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/process-cheque/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  // Get list of cheques
  getCheques: async (limit = 50, offset = 0) => {
    try {
      const response = await api.get(`/cheques/?limit=${limit}&offset=${offset}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cheques:', error);
      throw error;
    }
  },
  
  // Get single cheque details
  getChequeDetails: async (chequeId) => {
    try {
      const response = await api.get(`/cheques/${chequeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cheque details:', error);
      throw error;
    }
  },
  
  // Get signature image URL
  getSignatureImageUrl: (chequeId) => {
    return `${API_BASE_URL}/cheques/${chequeId}/signature`;
  },
  
  // Get cheque image URL
  getChequeImageUrl: (chequeId) => {
    return `${API_BASE_URL}/cheques/${chequeId}/image`;
  },
  
  // Health check
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy' };
    }
  },
};

export default chequeApi;