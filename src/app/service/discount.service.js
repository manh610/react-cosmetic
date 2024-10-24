import axios from 'axios';

import { config } from '../config/config'

const baseURL = `${config.REACT_APP_BASE_URL}/discount`;

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const DiscountService = {
  // Search discounts
  search: (data) => {
    const params = new URLSearchParams();
    Object.keys(data).forEach(key => {
      params.append(key, data[key]);
    });
    return axios.get(`${baseURL}`, { ...httpOptions, params });
  },

  // Create a new discount
  create: (data) => {
    return axios.post(`${baseURL}`, data, httpOptions);
  },

  // Update an existing discount by ID
  update: (id, data) => {
    return axios.put(`${baseURL}/${id}`, data, httpOptions);
  },

  // Get discount details by ID
  detail: (id) => {
    return axios.get(`${baseURL}/${id}`, httpOptions);
  },

  // Delete a discount by ID
  delete: (id) => {
    return axios.delete(`${baseURL}/${id}`, httpOptions);
  },

  // Add a user to a discount
  addUser: (data) => {
    return axios.post(`${baseURL}/user`, data, httpOptions);
  },

  // Add a product to a discount
  addProduct: (data) => {
    return axios.post(`${baseURL}/product`, data, httpOptions);
  },

  // Add a product item to a discount
  addProductItem: (data) => {
    return axios.post(`${baseURL}/product-item`, data, httpOptions);
  }
};

export default DiscountService;
