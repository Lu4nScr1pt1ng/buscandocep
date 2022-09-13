import axios from 'axios';

// https://viacep.com.br/

const api = axios.create({
  baseURL: 'https://viacep.com.br',
});

export default api;
