// utils/axiosWithToken.js
import axios from 'axios';

export const axiosWithToken = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
