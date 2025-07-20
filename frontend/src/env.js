export const env = {
  APP_NAME: process.env.REACT_APP_NAME || "Vedic Medix",
  BASE_THEME: process.env.REACT_APP_BASE_THEME || "indigo",
  APP_EMAIL: process.env.REACT_APP_EMAIL || "vedicmedix.io@gmail.com",
  APP_LINK: process.env.REACT_APP_LINK || "vedicmedix.io.com",
  BACKEND_ENDPOINT: process.env.REACT_APP_BACKEND_ENDPOINT || "http://localhost:4000"
};

// Keep backward compatibility
export const env_props = env;
