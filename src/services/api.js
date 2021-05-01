import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4450/api/v1',
});

const routes = {
  signIn: '/session',
  signUp: '/pharms',
  updateUser: '/pharms',
  searchAddress: '/map/search/address',
  searchLatLong: '/map/search/latLong',
  userExist: '/pharms/user/exist',
};

export { routes };
export default api;
