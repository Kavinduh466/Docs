const API_BASE ="/api";

export async function getLocations() {
  const res = await fetch(`${API_BASE}/get_location_names`);
  return res.json(); 
}

export async function getEstimatedPrice(formData) {
  const res = await fetch(`${API_BASE}/get_estimated_price`, {
    method: "POST",
    body: formData,
  });
  return res.json(); 
}
