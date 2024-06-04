import { observable, action, makeAutoObservable, computed } from "mobx";
import firestore from '@react-native-firebase/firestore';

export default class CartStore {


    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
    }

    @observable cartCount;
    @observable cartItems;
    @observable itemCount;
    @observable totalAmount;

    @action
    initialState = () => {
        this.cartCount = 0;
        this.cartItems = [];
        this.itemCount = 0;
        this.totalAmount = 0;
    }

    @action
    init = async (profileInfo) => {
        // Fetch the total items in cart from firebase and set the cartCount
        try {
            await Promise.all([
                this.fetchCartItem(profileInfo),
                // this.cartItemsCount(),
            ]);
        } catch (e) {
            console.error('Error initializing store:', e);
        }
    }

    @action
    fetchCartItem = async (profileInfo) => {
        try {
            const { id, authProvider } = profileInfo;
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
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.cartItems = userData.cart;
            }
        }
        catch (e) {

        }
    }

    @action
    addItemToCart = async (product, userInfo) => {
        const { id, authProvider, } = userInfo;
        // find user -> check item exist -> Yes,increase the count only
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
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const indexIfProductExist = userData.cart.findIndex(
                    (item) => item.id == product.id
                )
                if (indexIfProductExist == -1) {
                    product.noOfItems = 1;
                    userData.cart.unshift(product)
                } else {
                    userData.cart.splice(indexIfProductExist, 1)
                    product.noOfItems += 1;
                    userData.cart.unshift(product)
                }
                await userDocRef.update({ cart: userData.cart })
                this.cartItems = userData.cart
                this.fetchCartItem(userInfo)
                console.log('cartItems', this.cartItems)
            }
        }
        catch (e) {

        }


    }

    @action
    cartItemsCount() {
        this.cartCount = this.cartItems.length;
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

}