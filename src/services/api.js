import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4450/api/v1',
});

const routes = {
  signIn: '/session',
  signUp: '/pharms',
  searchAddress: '/map/search/address',
  searchLatLong: '/map/search/latLong',
};

export { routes };
export default api;
