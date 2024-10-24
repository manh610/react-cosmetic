import axios from 'axios';

import { config } from '../config/config'

const baseURL = `${config.REACT_APP_BASE_URL}/product`;

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const ProductService = {
  // Search products
  search: (data) => {
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => {
      params.append(key, data[key]);
    });
    return axios.get(`${baseURL}`, { ...httpOptions, params });
  },

  // Create a product
  create: (data) => {
    return axios.post(`${baseURL}`, data, httpOptions);
  },

  // Update a product
  update: (id, data) => {
    return axios.put(`${baseURL}/${id}`, data, httpOptions);
  },

  // Get product by ID
  getById: (id) => {
    return axios.get(`${baseURL}/${id}`, httpOptions);
  },

  // Delete a product by ID
  delete: (id) => {
    return axios.delete(`${baseURL}/${id}`, httpOptions);
  },

  // Delete a single image by ID
  deleteImage: (id) => {
    return axios.delete(`${baseURL}/image/${id}`, httpOptions);
  },

  // Delete multiple images
  deleteMultiImage: (ids) => {
    return axios.delete(`${baseURL}/images`, { data: ids, ...httpOptions });
  },

  // Change the main photo of a product
  changePhoto: (id, file) => {
    const formData = new FormData();
    formData.append('photo', file);
    return axios.put(`${baseURL}/photo/${id}`, formData);
  },

  // Change multiple images of a product
  changeImage: (id, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    return axios.put(`${baseURL}/images/${id}`, formData);
  }
};

export default ProductService;
