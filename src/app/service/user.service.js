import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_BASE_PATH;

class UserService {

  // Search users
  search(data) {
    return axios.get(`${BASE_URL}/user`, { params: data })
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Create user
  create(data) {
    return axios.post(`${BASE_URL}/user`, data)
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Update user
  update(data) {
    return axios.put(`${BASE_URL}/user/${data.id}`, data)
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Get user by ID
  getById(id) {
    return axios.get(`${BASE_URL}/user/${id}`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Delete user
  delete(id) {
    return axios.delete(`${BASE_URL}/user/${id}`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Block user
  block(id) {
    return axios.put(`${BASE_URL}/user/block/${id}`, {})
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Recover user
  recover(id) {
    return axios.put(`${BASE_URL}/user/recover/${id}`, {})
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Change user password
  changePassword(data) {
    const params = new URLSearchParams();
    params.append('newPassword', data.newPassword);
    params.append('oldPassword', data.oldPassword);
    params.append('username', data.username);

    return axios.put(`${BASE_URL}/me/change-password`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(response => response.data)
      .catch(this.handleError);
  }

  // Get discount for user
  getDiscount(id, data) {
    return axios.get(`${BASE_URL}/user/discount/${id}`, { params: data })
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Get user address
  getAddress(id) {
    return axios.get(`${BASE_URL}/address/user/${id}`)
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Get user from token
  getUserFromToken(token) {
    return axios.get(`${BASE_URL}/user/user-infor`, { params: token })
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Get expire time from token
  getExpireTimeFromToken(token) {
    return axios.get(`${BASE_URL}/user/expireTime`, { params: token })
      .then(response => response.data)
      .catch(this.handleError);
  }

  // Error handling
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
}

export default new UserService();
