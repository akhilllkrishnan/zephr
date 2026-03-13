export default {
  // zephr-managed:start
  stylePack: "notion",
  prefix: "z",
  tokens: {
    color: {
      primary: "#2563eb",
      accent: "#2563eb",
      primaryContrast: "#ffffff"
    }
  },
  // zephr-managed:end,
  semanticAliases: {
    "color.page": "color.background",
    "color.card": "color.surface",
    "color.copy": "color.text"
  },
  plugins: [],
  cloud: {
    baseUrl: "http://localhost:8787",
    apiKey: process.env.ZEPHR_API_KEY
  }
};
