import axios from 'axios';

export default {

  async all() {

    try {
      const response = await axios.get(`api/v1/users`, {
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
      const response = await axios.patch(`api/v1/users/${request.get('uid')}`, request, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
  async signIn(idToken: string) {

    try {
      const response = await axios.post(`api/v1/auth`, {id_token: idToken}, {
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
  async signOut() {

    try {
      const response = await axios.delete(`api/v1/auth/0`, {
        withCredentials: true,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }

  },
};
