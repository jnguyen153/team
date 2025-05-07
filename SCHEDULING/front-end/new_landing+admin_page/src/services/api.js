// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export async function fetchStudents() {
  const res = await axios.get(`${API_BASE_URL}/students`);
  return res.data;
}

export async function updateStudent(id, updates) {
  const res = await axios.put(`${API_BASE_URL}/students/${id}`, updates);
  return res.data;
}

export async function fetchSchedule() {
  const res = await axios.get(`${API_BASE_URL}/schedule`);
  return res.data;
}

export async function updateConstraints(constraints) {
  const res = await axios.post(`${API_BASE_URL}/constraints`, constraints);
  return res.data;
}

export async function generateSchedule() {
  const res = await axios.post(`${API_BASE_URL}/generate`);
  return res.data;
}

export async function adminLogin(username, password) {
  const res = await axios.post(`${API_BASE_URL}/admin/login`, { username, password });
  return res.data.token; // assume server returns { token: '...' }
}
