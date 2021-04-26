import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4450/api/v1',
});

const routes = {
  signIn: '/session',
  signUp: '/pharms',
  searchAddress: 'https://maps.googleapis.com/maps/api/geocode/json',
};

export { routes };
export default api;
