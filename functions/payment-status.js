// Netlify function to check payment status
const axios = require('axios');

// PayHero API credentials from environment variables
const API_USERNAME = process.env.PAYHERO_API_USERNAME;
const API_PASSWORD = process.env.PAYHERO_API_PASSWORD;

// Generate Basic Auth Token
const generateBasicAuthToken = () => {
  const credentials = `${API_USERNAME}:${API_PASSWORD}`;
  return 'Basic ' + Buffer.from(credentials).toString('base64');
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  // Process GET request
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }
  
  try {
    // Get reference from path parameter
    const reference = event.path.split('/').pop();
    
    if (!reference) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Payment reference is required' })
      };
    }
    
    const response = await axios({
      method: 'get',
      url: `https://backend.payhero.co.ke/api/v2/payments/${reference}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': generateBasicAuthToken()
      }
    });
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        payment: {
          status: response.data.status || 'PENDING',
          amount: response.data.amount,
          phoneNumber: response.data.phone_number,
          mpesaReceiptNumber: response.data.mpesa_receipt_number,
          resultDesc: response.data.result_desc
        }
      })
    };
  } catch (error) {
    console.error('Payment status check error:', error.response?.data || error.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to check payment status',
        error: error.response?.data || error.message
      })
    };
  }
};
