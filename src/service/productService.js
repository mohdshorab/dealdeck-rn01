import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

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


export const addProductToRecentlyView = async (product, userId) => {
  try {
    const userDocRef = firestore().collection('RegisteredUsers').doc(userId);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const recentlyViewedProducts = userData.recentlyViewedProducts || [];

      const indexOfExistProduct = recentlyViewedProducts.findIndex(
        (item) => item.id === product.id
      );

      if (indexOfExistProduct !== -1) {
        // If the product already exists, move it to the start of the list
        recentlyViewedProducts.splice(indexOfExistProduct, 1);
        recentlyViewedProducts.unshift(product);
      } else {
        // If the product doesn't exist, add it to the start of the list
        if (recentlyViewedProducts.length < 6) {
          recentlyViewedProducts.unshift(product);
        } else {
          // If the list is full (length = 6), remove the last item and add the new product to the start
          recentlyViewedProducts.pop();
          recentlyViewedProducts.unshift(product);
        }
      }
      await userDocRef.update({ recentlyViewedProducts });
      return recentlyViewedProducts;
    } else {
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error adding product to recently viewed:', error);
  }
};
// export const getTheRecentlyViewedProducts = async () => {
//   try {
//     const userDocRef = firestore().collection('RegisteredUsers').doc(userId);
//     const userDoc = await userDocRef.get();
//   }
//   catch (e) { }
// }