/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // O segredo está nesta linha
    autoprefixer: {},
  },
};

export default config;