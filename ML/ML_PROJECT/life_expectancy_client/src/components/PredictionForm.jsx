import React, { useState, useEffect } from 'react';
import { getCountries, getStatus, predictLifeExpectancy } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const PredictionForm = ({ onPrediction }) => {
  const [formData, setFormData] = useState({
    year: 2015,
    adult_mortality: 0,
    infant_deaths: 0,
    alcohol: 0,
    percentage_expenditure: 0,
    measles: 0,
    bmi: 0,
    under_five_deaths: 0,
    polio: 0,
    country: '',
    status: ''
  });

  const [countries, setCountries] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [countriesData, statusData] = await Promise.all([
          getCountries(),
          getStatus()
        ]);
        setCountries(countriesData);
        setStatusOptions(statusData);
        
        // Set default values
        if (countriesData.length > 0) {
          setFormData(prev => ({ ...prev, country: countriesData[0] }));
        }
        if (statusData.length > 0) {
          setFormData(prev => ({ ...prev, status: statusData[0] }));
        }
      } catch (err) {
        setError('Failed to load dropdown data. Please refresh the page.');
      } finally {
        setDataLoading(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'country' || name === 'status' ? value : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const prediction = await predictLifeExpectancy(formData);
      onPrediction(prediction);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return <LoadingSpinner message="Loading form data..." />;
  }

  return (
    <div className="prediction-form">
      <h2>Life Expectancy Prediction</h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max="2100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adult_mortality">Adult Mortality (per 1000)</label>
            <input
              type="number"
              id="adult_mortality"
              name="adult_mortality"
              value={formData.adult_mortality}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="infant_deaths">Infant Deaths</label>
            <input
              type="number"
              id="infant_deaths"
              name="infant_deaths"
              value={formData.infant_deaths}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="alcohol">Alcohol Consumption (liters)</label>
            <input
              type="number"
              id="alcohol"
              name="alcohol"
              value={formData.alcohol}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="percentage_expenditure">Health Expenditure (%)</label>
            <input
              type="number"
              id="percentage_expenditure"
              name="percentage_expenditure"
              value={formData.percentage_expenditure}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="measles">Measles Cases</label>
            <input
              type="number"
              id="measles"
              name="measles"
              value={formData.measles}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="bmi">BMI (Average)</label>
            <input
              type="number"
              id="bmi"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="under_five_deaths">Under-Five Deaths</label>
            <input
              type="number"
              id="under_five_deaths"
              name="under_five_deaths"
              value={formData.under_five_deaths}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="polio">Polio Immunization (%)</label>
            <input
              type="number"
              id="polio"
              name="polio"
              value={formData.polio}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Development Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Life Expectancy'}
        </button>
      </form>
    </div>
  );
};

export default PredictionForm;