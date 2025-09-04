const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export async function getLocations() {
  const res = await fetch(`${API_BASE}/get_location_names`);
  return res.json(); // returns { locations: [...] }
}

export async function getEstimatedPrice(formData) {
  const res = await fetch(`${API_BASE}/get_estimated_price`, {
    method: "POST",
    body: formData,
  });
  return res.json(); 
}
