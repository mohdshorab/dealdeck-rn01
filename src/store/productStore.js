import { observable, action, makeAutoObservable } from "mobx";
import firestore from '@react-native-firebase/firestore';
import { fetchTheNextGenProduct, fetchTheSponsoredProduct, getAllProducts, getProductsCategories, getProductsOfCategory, getProductsRandomly, getSearchResults, searchTheProduct } from "../service/productService";

export default class Products {
    @observable products = {};
    @observable productCategories = [];
    @observable randomProduct = [];
    @observable recentlyViewedProducts = [];

    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
    }

    @action
    init = async (profileInfo) => {
        try {
            const promises = [
                this.fetchAllProducts(),
                this.fetchProductsCategories(),
                this.fetchRandomProducts(),
            ];
    
            if (profileInfo && Object.keys(profileInfo).length > 0) {
                promises.push(this.fetchRecentlyViewedProducts(profileInfo));
            }
    
            await Promise.all(promises);
        } catch (e) {
            console.error('Error initializing store:', e);
        }
    }

    @action
    fetchAllProducts = async () => {
        const res = await getAllProducts();
        this.products = res.products || {};
    }

    @action
    fetchProductsCategories = async () => {
        const res = await getProductsCategories();
        this.productCategories = res || [];
    }

    @action
    fetchRandomProducts = async () => {
        const res = await getProductsRandomly();
        this.randomProduct = res?.products || [];
    }

    @action
    fetchProductsByCategory = async (category) => {
        const res = await getProductsOfCategory(category);
        return res?.products || [];
    }

    @action
    fetchProductsBySearch = async (productName) => {
        const res = await searchTheProduct(productName);
        return res?.products || [];
    }

    @action
    fetchRecentlyViewedProducts = async (profileData) => {
        try {
            const querySnapshot = await this.getUserQuerySnapshot(profileData);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.recentlyViewedProducts = userData.recentlyViewedProducts || [];
            }
        } catch (e) {
            console.error('Error fetching recently viewed products:', e);
        }
    }

    @action
    addProductToTheRecentlyViewedInFS = async (product, userInfo) => {
        try {
            const querySnapshot = await this.getUserQuerySnapshot(userInfo);
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedRecentlyViewedProducts = this.updateRecentlyViewedProducts(userData.recentlyViewedProducts, product);
                await userDocRef.update({ recentlyViewedProducts: updatedRecentlyViewedProducts });
                this.recentlyViewedProducts = updatedRecentlyViewedProducts;
            }
        } catch (e) {
            console.error('Error adding product to recently viewed:', e);
        }
    }

    @action
    getSearchResults = async (text) => {
        try {
            const result = await getSearchResults(text);
            if (result?.products && result?.products.length > 0) return { ...result, status: true }
            else return { status: false }
        }
        catch (e) {
            console.error('Error in searching :', e);
         }
    }

    getUserQuerySnapshot = async (profileData) => {
        const { id, authProvider } = profileData;
        const collectionName = authProvider === 'email' ? 'RegisteredUsers' : 'UsersLoggedUsingGoogle';
        console.log('ID', id)
        console.log(await firestore().collection(collectionName).where('id', '==', id).get())
        return await firestore().collection(collectionName).where('id', '==', id).get();
    }

    updateRecentlyViewedProducts = (recentlyViewedProducts, product) => {
        const productIndex = recentlyViewedProducts.findIndex((item) => item.id === product.id);
        if (productIndex === -1) {
            if (recentlyViewedProducts.length === 8) {
                recentlyViewedProducts.pop();
            }
            return [product, ...recentlyViewedProducts];
        } else {
            const updatedRecentlyViewedProducts = [...recentlyViewedProducts];
            updatedRecentlyViewedProducts.splice(productIndex, 1);
            return [product, ...updatedRecentlyViewedProducts];
        }
    }
}