import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export default {

  async all() {

    try {
      const response = await axios.get(`/api/v1/loans`, {headers, withCredentials: true});
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async create(request: any) {

    try {
      const response = await axios.post(`/api/v1/loans`, request, {headers, withCredentials: true});
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async update(request: any) {

    try {
      const response = await axios.patch(`/api/v1/loans/${request.id}`, request, {headers, withCredentials: true});
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async delete(request: any) {

    try {
      const response = await axios.delete(`/api/v1/loans/${request.id}`, {headers, withCredentials: true});
      return Promise.resolve(response.data.id);
    } catch (error) {
      return Promise.reject(error);
    }

  },
};
