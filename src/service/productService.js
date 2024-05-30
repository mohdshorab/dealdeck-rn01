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

export const getProductsCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product categories from the API.');
  }
}

export const getProductsRandomly = async () => {
  try {
    const randomLimit = Math.floor(Math.random() * 90) + 1;

    const response = await axios.get(`${baseUrl}/products?limit=6&skip=${randomLimit}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch limited products from the API.');
  }
}


export const getProductsOfCategory = async (categoryName) => {
  try {
    const response = await axios.get(`${baseUrl}/products/category/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product categories from the API.');
  }
}

export const searchTheProduct = async (productName) => {
  try {
    const response = await axios.get(`${baseUrl}/products//search?q=${productName}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product categories from the API.');
  }
}

export const fetchTheNextGenProduct = async () => {
  try {
    const respone = await axios.get('https://api.escuelajs.co/api/v1/categories/2/products');
    return respone.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product categories from the API.');
  }
}

export const fetchTheSponsoredProduct = async () => {
  try {
    const response = await axios.get(`https://dummyjson.com/products/1`);
    return response.data
  }
  catch (e) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch product categories from the API.');
  }
}