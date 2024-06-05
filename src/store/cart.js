import { observable, action, makeAutoObservable, computed } from "mobx";
import firestore from '@react-native-firebase/firestore';

export default class CartStore {
    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @observable cartItems = [];

    @computed get cartCount() {
        return this.cartItems.length;
    }

    @computed get itemCount() {
        return this.cartItems.reduce((total, item) => total + item.noOfItems, 0);
    }

    @computed get totalAmount() {
        return this.cartItems.reduce((total, item) => total + item.price * item.noOfItems, 0);
    }

    @action
    initialState = () => {
        this.cartItems = [];
    }

    @action
    init = async (profileInfo) => {
        try {
            await this.fetchCartItem(profileInfo);
        } catch (e) {
            console.error('Error initializing store:', e);
        }
    }

    @action
    fetchCartItem = async (profileInfo) => {
        try {
            const { id, authProvider } = profileInfo;
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.cartItems = userData.cart || [];
            } else {
                console.error('User data not found');
            }
        } catch (e) {
            console.error('Error fetching cart items:', e);
        }
    }

    @action
    addItemToCart = async (product, userInfo) => {
        const { id, authProvider } = userInfo;
        console.log(id, authProvider)
        try {
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedCart = this.updateCartWithProduct(userData.cart, product);
                await userDocRef.update({ cart: updatedCart });
                this.cartItems = updatedCart;
                console.log('updatedCart', updatedCart)
                console.log('updatedCart', this.cartItems)
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    @action
    removeItemFromCart = async (product, userInfo) => {
        const { id, authProvider } = userInfo;
        try {
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedCart = userData.cart.filter((item) => item.id !== product.id);
                await userDocRef.update({ cart: updatedCart });
                this.cartItems = updatedCart;
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    }

    @action
    increaseItemCount = async (product, userInfo) => {
        const { id, authProvider } = userInfo;
        try {
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedCart = this.updateCartWithProduct(userData.cart, product, 1);
                await userDocRef.update({ cart: updatedCart });
                this.cartItems = updatedCart;
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error increasing item count:', error);
        }
    }

    @action
    decreaseItemCount = async (product, userInfo) => {
        const { id, authProvider } = userInfo;
        try {
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedCart = this.updateCartWithProduct(userData.cart, product, -1);
                await userDocRef.update({ cart: updatedCart });
                this.cartItems = updatedCart;
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error decreasing item count:', error);
        }
    }

    getUserQuerySnapshot = async (authProvider, id) => {
        const collectionName = authProvider === 'email' ? 'RegisteredUsers' : 'UsersLoggedUsingGoogle';
        return await firestore().collection(collectionName).where('id', '==', id).get();
    }

    updateCartWithProduct = (cart, product, countChange = 0) => {
        const productIndex = cart.findIndex((item) => item.id === product.id);
        if (productIndex === -1) {
            if (countChange > 0) {
                return [{ ...product, noOfItems: countChange }, ...cart];
            } else {
                return [{ ...product, noOfItems: 1 }, ...cart];
            }
        } else {
            const updatedCart = [...cart];
            const updatedCount = updatedCart[productIndex].noOfItems + countChange;
            if (updatedCount > 0) {
                updatedCart[productIndex] = { ...product, noOfItems: updatedCount };
            } else {
                updatedCart.splice(productIndex, 1);
            }
            return updatedCart;
        }
    }
}