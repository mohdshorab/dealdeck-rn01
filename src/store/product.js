import { observable, action, makeAutoObservable } from "mobx";
import { fetchTheNextGenProduct, fetchTheSponsoredProduct, getAllProducts, getProductsCategories, getProductsOfCategory, getProductsRandomly, searchTheProduct } from "../service/productService";
import { isNull, isUndefined } from 'lodash';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENTLY_VIEWED_PRODUCTS_KEY = 'recentlyViewedProducts';
const MAX_RECENTLY_VIEWED_PRODUCTS = 6;
export default class Products {

    @observable showLoader;
    @observable products;
    @observable productCategories;
    @observable randomProduct;
    @observable recentlyViewedProducts;
    @observable sponsoredItem;


    @action
    initialState() {
        this.showLoader = false;
        this.products = {};
        this.productCategories = [];
        this.randomProduct = [];
        this.recentlyViewedProducts = [];
        this.sponsoredItem = {};
    }

    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @action
    init = async () => {
        try {
            await Promise.allSettled([
                this.loadAllProducts,
                this.loadProductsCategories,
                this.loadRandomProducts,
                this.getRecentlyViewedProducts,
            ])
                .then((results) => {
                    results.forEach(element => {
                        console.log(element.status);
                    })
                })
            // this.showLoader(false);
        } catch (e) {
            console.log(e);
            // this.showLoader(false);
        }
    }

    @action
    loadAllProducts = async () => {
        const res = await getAllProducts();
        if (!isNull(res.products) && !isUndefined(res.products)) {
            this.products = res.products;
        }
    }

    @action
    loadProductsCategories = async () => {
        const res = await getProductsCategories();
        (!isNull(res) && !isUndefined(res)) ? this.productCategories = res : null
    }

    @action
    loadRandomProducts = async () => {
        const res = await getProductsRandomly();
        res && res?.products.length ? this.randomProduct = res.products : []
    }

    @action
    loadProductsOfCategory = async (category) => {
        const res = await getProductsOfCategory(category);
        if (res && res?.products.length) return res.products;
        else Alert.alert('Got an error while fetching the data.')
    }

    @action
    loadProductsOfSearch = async (productName) => {
        const res = await searchTheProduct(productName);
        if (res && res?.products.length) return res.products;
        else Alert.alert('Got an error while fetching the data.')
    }



    @action
    getRecentlyViewedProducts = async () => {
        try {
            const storedProducts = await AsyncStorage.getItem(RECENTLY_VIEWED_PRODUCTS_KEY);
            return storedProducts ? JSON.parse(storedProducts) : [];
        } catch (error) {
            console.error('Error retrieving recently viewed products:', error);
            return [];
        }
    };

    @action
    addRecentlyViewedProduct = async (product) => {
        try {
            const recentlyViewedProducts = await this.getRecentlyViewedProducts();
            const existingProductIndex = recentlyViewedProducts.findIndex(
                (p) => p.id === product.id
            );

            if (existingProductIndex !== -1) {
                // If the product already exists, move it to the start of the list
                recentlyViewedProducts.splice(existingProductIndex, 1);
            } else if (recentlyViewedProducts.length >= MAX_RECENTLY_VIEWED_PRODUCTS) {
                // If the list is full, remove the oldest product
                recentlyViewedProducts.pop();
            }

            const updatedProducts = [product, ...recentlyViewedProducts];

            await AsyncStorage.setItem(
                RECENTLY_VIEWED_PRODUCTS_KEY,
                JSON.stringify(updatedProducts)
            );
        } catch (error) {
            console.error('Error saving recently viewed product:', error);
        }
    };

    @action
    loadNextGenProduct = async () => {
        const res = await fetchTheNextGenProduct();
        if (res && res?.length) return res;
    }

    @action
    loadTheSponsoredItem = async () => {
        try{
            const res = await fetchTheSponsoredProduct();
this.sponsoredItem ={data:'none'}        }
        catch(e){
            console.error('Error fetching sponsored product:', error);   
        }
    }


}
