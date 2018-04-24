const PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
  ORIGIN: PRODUCTION ? 'your_production_URL' : 'http://localhost:8080',
};