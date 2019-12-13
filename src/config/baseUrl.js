let baseUrl;

process.env.NODE_ENV === 'production'
  ? (baseUrl = 'https://hr-app3.herokuapp.com')
  : (baseUrl = 'http://localhost:3000');

export default baseUrl;
