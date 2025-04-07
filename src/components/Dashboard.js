import React, { useState, useEffect, useContext } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import chequeApi from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { ThemeContext } from '../context/ThemeContext';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [chequesData, setChequesData] = useState({
    total: 0,
    cheques: [],
    loading: true,
    error: null
  });
  
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  
  // Set colors based on theme
  const textColor = theme === 'dark' ? '#e5e7eb' : '#374151';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all cheques (with a high limit to get most of them)
      const data = await chequeApi.getCheques(100, 0);
      setChequesData({
        total: data.total,
        cheques: data.cheques || [],
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setChequesData({
        ...chequesData,
        loading: false,
        error: 'Failed to load dashboard data.'
      });
    }
  };

  // Process data for bank distribution chart
  const prepareBankDistributionData = () => {
    const bankMap = {};
    
    // Check if cheques array exists and has items
    if (!chequesData.cheques || chequesData.cheques.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['#cccccc'],
          borderWidth: 1
        }]
      };
    }
    
    // Extract bank information
    chequesData.cheques.forEach(cheque => {
      // Use extracted_data if needed and available, otherwise use the bank property
      let bankName = '';
      
      if (cheque.extracted_data && cheque.extracted_data.bank_details && cheque.extracted_data.bank_details.value) {
        bankName = cheque.extracted_data.bank_details.value;
      } else if (cheque.bank) {
        bankName = cheque.bank;
      } else {
        bankName = 'Unknown';
      }
      
      bankMap[bankName] = (bankMap[bankName] || 0) + 1;
    });
    
    const labels = Object.keys(bankMap);
    const data = Object.values(bankMap);
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#4BC0C0', '#FF6384', '#FFCD56', '#36A2EB', '#9966FF', '#FF9F40', '#8CD867'
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Process data for amount distribution chart
  const prepareAmountDistributionData = () => {
    const amountRanges = {
      '0-1000': 0,
      '1001-5000': 0,
      '5001-10000': 0,
      '10001-50000': 0,
      '50001+': 0,
      'Unknown': 0
    };
    
    // Check if cheques array exists and has items
    if (!chequesData.cheques || chequesData.cheques.length === 0) {
      return {
        labels: Object.keys(amountRanges),
        datasets: [{
          label: 'Number of Cheques',
          data: Object.values(amountRanges),
          backgroundColor: '#36A2EB',
        }]
      };
    }
    
    chequesData.cheques.forEach(cheque => {
      let amount = 0;
      let amountStr = '';
      
      // Try to get amount from different sources
      if (cheque.extracted_data && cheque.extracted_data.amount_numerical && cheque.extracted_data.amount_numerical.value) {
        amountStr = cheque.extracted_data.amount_numerical.value;
      } else if (cheque.amount) {
        amountStr = cheque.amount;
      }
      
      if (!amountStr) {
        amountRanges['Unknown']++;
        return;
      }
      
      try {
        // Remove currency symbols, commas, etc.
        const cleanAmount = amountStr.replace(/[^0-9.]/g, '');
        amount = parseFloat(cleanAmount);
        
        if (isNaN(amount)) {
          amountRanges['Unknown']++;
          return;
        }
      } catch (e) {
        amountRanges['Unknown']++;
        return;
      }
      
      // Categorize by range
      if (amount <= 1000) {
        amountRanges['0-1000']++;
      } else if (amount <= 5000) {
        amountRanges['1001-5000']++;
      } else if (amount <= 10000) {
        amountRanges['5001-10000']++;
      } else if (amount <= 50000) {
        amountRanges['10001-50000']++;
      } else {
        amountRanges['50001+']++;
      }
    });
    
    const labels = Object.keys(amountRanges);
    const data = Object.values(amountRanges);
    
    return {
      labels,
      datasets: [
        {
          label: 'Number of Cheques',
          data,
          backgroundColor: '#36A2EB',
        },
      ],
    };
  };

  // Chart options with theme-aware colors
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        bodyColor: textColor,
        backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
        borderColor: theme === 'dark' ? '#4B5563' : '#E5E7EB',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      },
      y: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: textColor
        }
      }
    }
  };

  // Calculate recent statistics
  const calculateRecentStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;
    
    // Check if cheques array exists and has items
    if (!chequesData.cheques || chequesData.cheques.length === 0) {
      return { today: 0, week: 0, month: 0 };
    }
    
    chequesData.cheques.forEach(cheque => {
      if (!cheque.processing_timestamp) return;
      
      const chequeDate = new Date(cheque.processing_timestamp);
      
      if (chequeDate >= today) {
        todayCount++;
      }
      
      if (chequeDate >= weekStart) {
        weekCount++;
      }
      
      if (chequeDate >= monthStart) {
        monthCount++;
      }
    });
    
    return {
      today: todayCount,
      week: weekCount,
      month: monthCount
    };
  };

  if (chequesData.loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (chequesData.error) {
    return (
      <div className="alert alert-danger" role="alert">
        {chequesData.error}
      </div>
    );
  }

  const recentStats = calculateRecentStats();
  const bankDistributionData = prepareBankDistributionData();
  const amountDistributionData = prepareAmountDistributionData();

  return (
    <div className="dashboard">
      {/* Stats Overview */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2 text-muted">{t('dashboard.stats.total')}</h6>
              <h3 className="card-title">{chequesData.total || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2 text-muted">{t('dashboard.stats.today')}</h6>
              <h3 className="card-title">{recentStats.today}</h3>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2 text-muted">{t('dashboard.stats.week')}</h6>
              <h3 className="card-title">{recentStats.week}</h3>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <h6 className="card-subtitle mb-2 text-muted">{t('dashboard.stats.month')}</h6>
              <h3 className="card-title">{recentStats.month}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="row">
        {/* Bank Distribution Chart */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">{t('dashboard.chart.bank')}</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px', position: 'relative' }}>
                <Pie 
                  data={bankDistributionData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        ...chartOptions.plugins.legend,
                        position: 'bottom'
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Amount Distribution Chart */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">{t('dashboard.chart.amounts')}</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px', position: 'relative' }}>
                <Bar 
                  data={amountDistributionData} 
                  options={chartOptions} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;