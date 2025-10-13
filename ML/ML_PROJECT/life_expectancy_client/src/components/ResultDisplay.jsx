import React from 'react';

const ResultDisplay = ({ prediction }) => {
  if (prediction === null || prediction === undefined) return null;

  return (
    <div className="result-display">
      <h3>Prediction Result</h3>
      <div className="result-card">
        <div className="result-value">
          <span className="result-number">{Number(prediction).toFixed(2)}</span>
          <span className="result-label">years</span>
        </div>
        <p className="result-description">
          Predicted Life Expectancy
        </p>
      </div>
    </div>
  );
};

export default ResultDisplay;
