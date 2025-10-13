import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/get_countries`);
    return response.data.countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const getStatus = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/get_status`);
    return response.data.status;
  } catch (error) {
    console.error('Error fetching status:', error);
    throw error;
  }
};

export const predictLifeExpectancy = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/predict_life_expectancy`, data);
    return response.data.predicted_life_expectancy; // <-- use the correct key
  } catch (error) {
    console.error('Error predicting life expectancy:', error);
    throw error;
  }
};
