import { observable, action, makeAutoObservable } from "mobx";
import { getAllProducts } from "../service/productService";
import { isNull, isUndefined } from 'lodash';

export default class Products {

    @observable showLoader;
    @observable products;

    @action
    initialState() {
            this.showLoader = false;
            this.products = {};
        }

    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @action
    loadProducts = async() => {
        this.showLoader = true;
        const res = await getAllProducts();
        if(!isNull(res.products) && !isUndefined(res.products) ){
            this.products = res.products;
            this.showLoader = false;
            return true;
        }
        this.showLoader = false;
    }


}
