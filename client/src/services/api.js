// In development Vite proxies /api to the Express server (see vite.config.js).
// In production Express serves both the API and the built client, so a relative URL works.
// Set VITE_API_URL only if the API is hosted on a different origin.
const BASE_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  let data = null;
  try {
    data = await response.json();
  } catch {
    /* non-JSON response */
  }
  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong. Please try again.");
  }
  return data;
}

export const fetchPortfolio = () => request("/api/portfolio");


export const sendContactMessage = (payload) =>
  request("/api/contact", { method: "POST", body: JSON.stringify(payload) });
