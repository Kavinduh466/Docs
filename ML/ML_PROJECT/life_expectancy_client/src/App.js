import React, { useState } from 'react';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import './App.css';

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (result) => {
    setPrediction(result);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Life Expectancy Predictor</h1>
        <p>Predict life expectancy based on health and demographic factors</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <PredictionForm onPrediction={handlePrediction} />
          <ResultDisplay prediction={prediction} />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Machine Learning Life Expectancy Prediction Model</p>
      </footer>
    </div>
  );
}

export default App;