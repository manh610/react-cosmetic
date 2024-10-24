import axios from 'axios';

import { config } from '../config/config'

const baseURL = `${config.REACT_APP_BASE_URL}/skin-type`;

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const SkinTypeService = {
  // Search skin types
  search: () => {
    return axios.get(`${baseURL}`, httpOptions);
  },

  // Create a new skin type
  create: (data) => {
    const jsonData = JSON.parse(data);
    return axios.post(`${baseURL}`, jsonData, httpOptions);
  },

  // Update an existing skin type by ID
  update: (id, data) => {
    const jsonData = JSON.stringify(data);
    return axios.put(`${baseURL}/${id}`, jsonData, httpOptions);
  },

  // Get a skin type by ID
  getById: (id) => {
    return axios.get(`${baseURL}/${id}`, httpOptions);
  },

  // Delete a skin type by ID
  delete: (id) => {
    return axios.delete(`${baseURL}/${id}`, httpOptions);
  }
};

export default SkinTypeService;
