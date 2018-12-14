import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};

export default {

  async all() {

    try {
      const response = await axios.get(`/api/v1/books`, {headers, withCredentials: true});
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async create(request: any) {

    try {
      const response = await axios.post(`/api/v1/books`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async update(request: any) {

    try {
      const response = await axios.patch(`/api/v1/books/${request.barcode}`, request, {headers, withCredentials: true});
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async delete(request: any) {

    try {
      const response = await axios.delete(`/api/v1/books/${request.barcode}`, {headers, withCredentials: true});
      return Promise.resolve(response.data.id);
    } catch (error) {
      return Promise.reject(error);
    }

  },
};
