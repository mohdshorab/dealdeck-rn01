import { observable, action, makeAutoObservable, computed } from "mobx";

export default class CartStore {


    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
    }

    @observable cartCount = 0;
    @observable.shallow cartItems = [];
    @observable itemCount = 0;
    @observable totalAmount = 0;

    @action
    init = () => {
        // Fetch the total items in cart from firebase and set the cartCount
    }

    @action
    addItemToCart = (productData) => {
        const existingProduct = this.cartItems.find(item => item.id === productData.id);
        if (existingProduct) {
            existingProduct.qty += 1;
        } else {
            const newProduct = { ...productData, qty: 1 };
            this.cartItems.push(newProduct);
        }
    }

    @computed
    get cartItemsCount() {
        return this.cartItems.length;
    }

    @action
    removeItemFromCart = () => {

    }

    @action
    increaseItemCount = () => {
        // Increase item from the firebase
        this.cartCount++;

    }

    @action
    decreaseItemCount = () => {
        // Increase item from the firebase
    }

    @action
    countTheItemsInTheCart = () => {
    }

}