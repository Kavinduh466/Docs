import React, { useState, useEffect } from "react";
import { getLocations, getEstimatedPrice } from "../services/priceApi";

function PricePredictor() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("1");
  const [bath, setBath] = useState("1");
  const [price, setPrice] = useState(null);

  const bhkOptions = [1, 2, 3, 4, 5];
  const bathOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    async function loadLocations() {
      try {
        const data = await getLocations();
        setLocations(data.locations || []);
        if (data.locations && data.locations.length > 0) {
          setLocation(data.locations[0]); 
        }
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    }
    loadLocations();
  }, []);

  const handleSubmit = async () => {
    if (!sqft) return;
    
    const formData = new FormData();
    formData.append("location", location);
    formData.append("total_sqft", sqft);
    formData.append("bhk", bhk);
    formData.append("bath", bath);

    try {
      const data = await getEstimatedPrice(formData);
      setPrice(data.locations || data.estimated_price); 
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const NumberSelector = ({ options, value, onChange, label, color }) => (
    <div style={{ marginBottom: '24px' }}>
      <label style={{ 
        display: 'block', 
        fontSize: '14px', 
        fontWeight: '600', 
        color: '#374151', 
        marginBottom: '12px' 
      }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {options.map((num) => (
          <button
            key={num}
            onClick={() => onChange(num.toString())}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: value === num.toString() ? 'scale(1.05)' : 'scale(1)',
              background: value === num.toString() ? color : '#f3f4f6',
              color: value === num.toString() ? 'white' : '#6b7280',
              boxShadow: value === num.toString() ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              if (value !== num.toString()) {
                e.target.style.background = '#e5e7eb';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              if (value !== num.toString()) {
                e.target.style.background = '#f3f4f6';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '440px',
      margin: '32px auto',
      padding: '32px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '8px',
          margin: '0 0 8px 0'
        }}>
          🏠 House Price Predictor
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0' }}>
          Get instant property price estimates
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            marginBottom: '8px' 
          }}>
            📍 Location
          </label>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #d1d5db',
              borderRadius: '12px',
              background: 'white',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          >
            {locations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            fontWeight: '600', 
            color: '#374151', 
            marginBottom: '8px' 
          }}>
            📐 Total Square Feet
          </label>
          <input 
            type="number" 
            value={sqft} 
            onChange={(e) => setSqft(e.target.value)} 
            placeholder="e.g., 1200"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #d1d5db',
              borderRadius: '12px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        <NumberSelector
          options={bhkOptions}
          value={bhk}
          onChange={setBhk}
          label="🏡 BHK (Bedrooms)"
          color="linear-gradient(135deg, #3b82f6, #2563eb)"
        />

        <NumberSelector
          options={bathOptions}
          value={bath}
          onChange={setBath}
          label="🚿 Bathrooms"
          color="linear-gradient(135deg, #8b5cf6, #7c3aed)"
        />

        <button 
          onClick={handleSubmit}
          disabled={!sqft}
          style={{
            width: '100%',
            padding: '16px',
            background: sqft ? 'linear-gradient(135deg, #10b981, #059669)' : '#9ca3af',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '12px',
            border: 'none',
            cursor: sqft ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            transition: 'all 0.2s',
            transform: 'scale(1)',
            boxShadow: sqft ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
          }}
          onMouseOver={(e) => {
            if (sqft) {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
            }
          }}
          onMouseOut={(e) => {
            if (sqft) {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }
          }}
        >
          🔍 Predict Price
        </button>
      </div>

      {price !== null && (
        <div style={{
          marginTop: '32px',
          padding: '24px',
          background: 'linear-gradient(135deg, #ecfdf5, #dbeafe)',
          borderRadius: '12px',
          border: '2px solid #10b981',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: '0'
          }}>
            💰 Estimated Price: <span style={{ color: '#059669' }}>₹ {price}</span>
          </h3>
        </div>
      )}
    </div>
  );
}

export default PricePredictor;