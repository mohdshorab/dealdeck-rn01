import axios from 'axios';

const customAxios = {
  getSearchResults: async (baseUrl, searchTerm) => {
    try {
      const response = await axios.get(`${baseUrl}/products/search?q=${searchTerm}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch search results from the API.');
    }
  },
  getProductById: async (baseUrl, productId) => {
    try {
      const response = await axios.get(`${baseUrl}/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch product details from the API.');
    }
  },
  getAllProducts: async (baseUrl) => {
    try {
      const response = await axios.get(`${baseUrl}/products`);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch all products from the API.');
    }
  },
  postData: async (baseUrl, endpoint, data) => {
    try {
      const response = await axios.post(`${baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to post data to the API.');
    }
  },
};

export default customAxios;
