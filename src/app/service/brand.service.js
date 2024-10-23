import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PATH}/brand`;

const BrandService = {
  //#region CRUD
  search: async (data) => {
    const params = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      params.append(key, data[key]);
    });

    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching brands:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await axios.post(API_URL, JSON.parse(data), {
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
      const response = await axios.put(`${API_URL}/${id}`, JSON.stringify(data), {
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
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting brand by ID:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting brand:', error);
      throw error;
    }
  },

  image: async (id, file) => {
    const formData = new FormData();
    formData.append('logo', file);

    try {
      const response = await axios.put(`${API_URL}/logo/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading brand image:', error);
      throw error;
    }
  }
  //#endregion
};

export default BrandService;
