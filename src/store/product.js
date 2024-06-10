import { observable, action, makeAutoObservable } from "mobx";
import firestore from '@react-native-firebase/firestore';
import { fetchTheNextGenProduct, fetchTheSponsoredProduct, getAllProducts, getProductsCategories, getProductsOfCategory, getProductsRandomly, searchTheProduct } from "../service/productService";

export default class Products {
    @observable products = {};
    @observable productCategories = [];
    @observable randomProduct = [];
    @observable recentlyViewedProducts = [];
    @observable sponsoredItem = null;

    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
    }

    @action
    init = async (profileInfo) => {
        try {
            await Promise.all([
                this.fetchAllProducts(),
                this.fetchProductsCategories(),
                this.fetchRandomProducts(),
                this.fetchRecentlyViewedProducts(profileInfo),
                this.fetchSponsoredProduct(),
            ]);
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
    fetchNextGenProduct = async () => {
        const res = await fetchTheNextGenProduct();
        return res || [];
    }

    @action
    fetchSponsoredProduct = async () => {
        try {
            const res = await fetchTheSponsoredProduct();
            this.sponsoredItem = res;
        } catch (error) {
            console.error('Error fetching sponsored product:', error);
            this.sponsoredItem = null;
        }
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

    getUserQuerySnapshot = async (profileData) => {
        const { id, authProvider } = profileData;
        const collectionName = authProvider === 'email' ? 'RegisteredUsers' : 'UsersLoggedUsingGoogle';
        console.log('ID',id)
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