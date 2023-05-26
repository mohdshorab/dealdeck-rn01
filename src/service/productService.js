import axios from 'axios';

const baseUrl = 'https://dummyjson.com';

export const getSearchResults = async ( searchTerm) => {
  try {
    const response = await axios.get(`${baseUrl}/products/search?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch search results from the API.');
  }
}

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${baseUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product details from the API.');
  }
}

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch all products from the API.');
  }
}
