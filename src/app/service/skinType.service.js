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
  search:  async () => {
    try {
      const response = await axios.get(baseURL, httpOptions );
      return response.data;
    } catch (error) {
      console.error('Error searching brands:', error);
      throw error;
    }
  },


  create: async (data) => {
    try {
      const response = await axios.post(baseURL, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating brand:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating brand:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting skin type by ID:', error);
      throw error;
    }
  },

  // Delete a skin type by ID
  delete: (id) => {
    return axios.delete(`${baseURL}/${id}`, httpOptions);
  },

  handleError(error) {
    if (error.response) {
      // Server errors
      console.error('Error response:', error.response);
      throw error.response.data;
    } else if (error.request) {
      // Network errors
      console.error('Error request:', error.request);
      throw new Error('Network error');
    } else {
      // Other errors
      console.error('Error:', error.message);
      throw new Error('Unexpected error');
    }
  }
};

export default SkinTypeService;
