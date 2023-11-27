import axios from 'axios'
import { AppError } from './app-error';
import { findTokenInStorage } from '@/storage';

const httpClient = axios.create({
  baseURL: 'https://quizify-api.onrender.com/api/v1',
})

httpClient.interceptors.request.use(async (config) => {
  const token = await findTokenInStorage()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message))
    }
    if (error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default httpClient