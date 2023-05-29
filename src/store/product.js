import { observable, action, makeAutoObservable } from "mobx";
import { getAllProducts, getProductsByCategories, getProductsRandomly } from "../service/productService";
import { isNull, isUndefined } from 'lodash';

export default class Products {

    @observable showLoader;
    @observable products;
    @observable productCategories;
    @observable randomProduct;


    @action
    initialState() {
        this.showLoader = false;
        this.products = {};
        this.productCategories = [];
        this.randomProduct = [];
    }

    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @action
    init = async () => {
        try {
            // this.showLoader = true;
            await Promise.allSettled([
                this.loadProducts,
                this.loadProductsCategories,
                this.loadRandomProducts
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
    loadProducts = async () => {
        const res = await getAllProducts();
        if (!isNull(res.products) && !isUndefined(res.products)) {
            this.products = res.products;
        }
    }

    @action
    loadProductsCategories = async () => {
        const res = await getProductsByCategories();
        (!isNull(res) && !isUndefined(res)) ? this.productCategories = res : {}
    }

    @action
    loadRandomProducts = async () => {
        const res = await getProductsRandomly();
        res && res?.products.length ? this.randomProduct = res.products : []
    }


}
