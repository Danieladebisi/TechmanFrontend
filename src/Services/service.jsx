import axios from 'axios';

const API_URL = "http://localhost:5000/api/phones";

export const getDevices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getDeviceById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createDevice = async (deviceData) => {
  const response = await axios.post(API_URL, deviceData);
  return response.data;
};

export const deleteDevice = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};