import axios from 'axios';

const baseUrl = 'https://dummyjson.com';

export const getSearchResults = async (searchTerm) => {
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

export const getProductsByCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product categories from the API.');
  }
}

export const getProductsRandomly = async()=>{
  try{
    // const randomLimit = Math.floor(Math.random()*90)+1;

    const response = await axios.get(`${baseUrl}/products?limit=6&skip=0`);
    return response.data;
  } catch(error){
    console.error('API Error:', error);
    throw new Error('Failed to fetch limited products from the API.');
  }
}
