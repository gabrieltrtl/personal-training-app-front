import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.10.15:3000',
  timeout: 5000,
});

const DEV_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImVtYWlsIjoiZ2FicmllbHRyYWluZXJAZ21haWwuY29tIiwicm9sZSI6InRyYWluZXIiLCJpYXQiOjE3NTcxNjcxNTAsImV4cCI6MTc1Nzc3MTk1MH0.9ezgNPOejCu9nQhS5SNOTcGmpG-FFaxiZ7c18diHZLo";

api.interceptors.request.use((config) => {
  if (__DEV__) {
    config.headers.Authorization = `Bearer ${DEV_TOKEN}`;
  }

  return config;
})

export default api;