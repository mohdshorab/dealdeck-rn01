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
        const { id, authProvider } = profileData;
        console.log(id, authProvider)
        try {
            let querySnapshot;
            if (authProvider == 'email') {
                querySnapshot = await firestore()
                    .collection('RegisteredUsers')
                    .where('id', '==', id)
                    .get();
            }
            else {
                querySnapshot = await firestore()
                    .collection('UsersLoggedUsingGoogle')
                    .where('id', '==', id)
                    .get();
            }
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.recentlyViewedProducts = userData.recentlyViewedProducts;
            }
        }
        catch (e) {

        }
    }


    @action
    addProductToTheRecentlyViewedInFS = async (product, userInfo) => {
        const { id, authProvider, } = userInfo;
        console.log('userINFO', id, authProvider)
        try {
            let querySnapshot;
            if (authProvider == 'email') {
                querySnapshot = await firestore()
                    .collection('RegisteredUsers')
                    .where('id', '==', id)
                    .get();
            }
            else {
                querySnapshot = await firestore()
                    .collection('UsersLoggedUsingGoogle')
                    .where('id', '==', id)
                    .get();
            }
            console.log('querySnapshot', querySnapshot)
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                console.log('DEBUG');
                console.log(userData)
                const isProductAlreadyExist = userData.recentlyViewedProducts.findIndex(
                    (item) => item.id === product.id
                )
                if (isProductAlreadyExist == -1) {
                    console.log('isProductAlreadyExist', isProductAlreadyExist)
                    if (userData.recentlyViewedProducts.length == 8) {
                        userData.recentlyViewedProducts.pop()
                    }
                    console.log('userData.recentlyViewedProducts', userData.recentlyViewedProducts);
                    userData.recentlyViewedProducts.unshift(product)
                    console.log('PRO');
                }
                else {
                    console.log('isProductAlreadyExist !== -1')
                    userData.recentlyViewedProducts.splice(isProductAlreadyExist, 1)
                    userData.recentlyViewedProducts.unshift(product)
                }
                await userDocRef.update({ recentlyViewedProducts: userData.recentlyViewedProducts })
                this.recentlyViewedProducts = userData.recentlyViewedProducts
            }
        }
        catch (e) {
            console.log('Got an error in addProductToTheRecentlyViewedInFS', e);
        }
    }

}
