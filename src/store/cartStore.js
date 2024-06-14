import { observable, action, makeAutoObservable, computed } from "mobx";
import { isNull, isUndefined } from 'lodash';
import firestore from '@react-native-firebase/firestore';
import { getValueFromAsyncStorage, removeDataFromAsyncStorage, setValueInAsyncStorage } from "../utils";

export default class CartStore {
    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @observable cartItems;
    @observable unauthenticatedCartItems;

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
        this.unauthenticatedCartItems = [];
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
            if (Object.keys(profileInfo).length === 0) {
                const items = await getValueFromAsyncStorage('CartItemsForNonLoggedPerson')
                if (!isNull(items) && !isUndefined(items)) {
                    const parsedItems = JSON.parse(items);
                    this.cartItems = parsedItems;
                }
            }
            else {
                const { id, authProvider } = profileInfo;
                const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    this.cartItems = userData.cart || [];
                } else {
                    console.error('User data not found');
                }
            }
        } catch (e) {
            console.error('Error fetching cart items:', e);
        }
    }

    @action
    addItemToCart = async (product, userInfo = {}) => {
        try {
            if (Object.keys(userInfo).length === 0) {
                const jsonValue = await getValueFromAsyncStorage('CartItemsForNonLoggedPerson');
                let jsonParse = [];
                if (!isNull(jsonValue) && !isUndefined(jsonValue)) {
                    jsonParse = JSON.parse(jsonValue);
                }
                const indexIfProductExistOrNot = jsonParse.findIndex((item) => item.id === product.id);
                if (indexIfProductExistOrNot === -1) {
                    const newProduct = { ...product, noOfItems: 1 };
                    jsonParse.push(newProduct);
                    await setValueInAsyncStorage('CartItemsForNonLoggedPerson', jsonParse);
                    this.cartItems = jsonParse;
                }
            } else {
                const { id, authProvider } = userInfo;
                const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
                console.log(querySnapshot)
                if (!querySnapshot.empty) {
                    const userDocRef = querySnapshot.docs[0].ref;
                    const userData = querySnapshot.docs[0].data();
                    const updatedCart = this.updateCartWithProduct(userData.cart, product);
                    await userDocRef.update({ cart: updatedCart });
                    this.cartItems = updatedCart;
                } else {
                    console.error('User data not found');
                }
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    @action
    increaseItemCount = async (product, userInfo = {}) => {
        try {
            if (Object.keys(userInfo).length == 0) {
                const jsonValue = await getValueFromAsyncStorage('CartItemsForNonLoggedPerson');
                let cartItems = [];
                if (!isNull(jsonValue) && !isUndefined(jsonValue)) {
                    cartItems = JSON.parse(jsonValue);
                }
                const indexIfProductExistOrNot = cartItems.findIndex((item) => item.id === product.id);
                cartItems[indexIfProductExistOrNot].noOfItems += 1;
                await setValueInAsyncStorage('CartItemsForNonLoggedPerson', cartItems)
                this.cartItems = cartItems;
            }
            else {
                const { id, authProvider } = userInfo;
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
            }
        } catch (error) {
            console.error('Error increasing item count:', error);
        }
    }

    @action
    decreaseItemCount = async (product, userInfo) => {
        try {
            if (Object.keys(userInfo).length === 0) {
                const jsonValue = await getValueFromAsyncStorage('CartItemsForNonLoggedPerson');
                let cartItems = [];
                if (!isNull(jsonValue) && !isUndefined(jsonValue)) {
                    cartItems = JSON.parse(jsonValue);
                }
                const indexIfProductExistOrNot = cartItems.findIndex((item) => item.id === product.id);
                if (cartItems[indexIfProductExistOrNot].noOfItems === 1) {
                    cartItems.splice(indexIfProductExistOrNot, 1);
                }
                else {
                    cartItems[indexIfProductExistOrNot].noOfItems -= 1;
                }
                await setValueInAsyncStorage('CartItemsForNonLoggedPerson', cartItems)
                this.cartItems = cartItems;
            }
            else {
                const { id, authProvider } = userInfo;
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
            }
        } catch (error) {
            console.error('Error decreasing item count:', error);
        }
    }

    @action
    fetchUnauthenticatedCartItemsMerged = async () => {
        try {
            const res = await getValueFromAsyncStorage('CartItemsForNonLoggedPerson');
            if (!isNull(res) && !isUndefined(res)) {
                this.unauthenticatedCartItems = JSON.parse(res);
            }
        }
        catch (e) {
            console.error('Error fetching  : unauthenticatedCartItems ', e);
        }
    }

    @action
    clearUnauthenticatedCartItemsMerged = async () => {
        try {
            await removeDataFromAsyncStorage('CartItemsForNonLoggedPerson');
            this.unauthenticatedCartItems = [];
        }
        catch (e) {
            console.error('Error clearing  : unauthenticatedCartItems ', e);
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