import axios from 'axios';

const URL = 'http://localhost:4000/api';

export const registerRequest = user => axios.post(URL+'/register', user);

export const loginRequest = user => axios.post(URL+'/login', user);
