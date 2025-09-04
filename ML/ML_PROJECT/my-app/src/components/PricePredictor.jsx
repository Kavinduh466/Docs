import React, { useState } from "react";

function PricePredictor() {
  const [location, setLocation] = useState("1st block jayanagar");
  const [sqft, setSqft] = useState("");
  const [bhk, setBhk] = useState("1");
  const [bath, setBath] = useState("1");
  const [price, setPrice] = useState(null);

  const locations = [
    "1st block jayanagar",
    "1st phase jp nagar",
    "2nd phase judicial layout",
    "5th block hbr layout",
    "banashankari",
  ];

  const bhkOptions = [1, 2, 3, 4, 5];
  const bathOptions = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("location", location);
    formData.append("total_sqft", sqft);
    formData.append("bhk", bhk);
    formData.append("bath", bath);

    try {
      const res = await fetch("http://127.0.0.1:5000/get_estimated_price", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPrice(data.locations);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🏠 House Price Predictor</h2>

      <form onSubmit={handleSubmit}>
        {/* Location */}
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Location: </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          >
            {locations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Total Sqft */}
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Total Sqft: </label>
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          />
        </div>

        {/* BHK */}
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>BHK: </label>
          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          >
            {bhkOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Bath */}
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label>Bath: </label>
          <select
            value={bath}
            onChange={(e) => setBath(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          >
            {bathOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Predict Price
        </button>
      </form>

      {/* Price Result */}
      {price !== null && (
        <h3 style={{ marginTop: "20px", color: "#333" }}>
          💰 Estimated Price: ₹ {price}
        </h3>
      )}
    </div>
  );
}

export default PricePredictor;
