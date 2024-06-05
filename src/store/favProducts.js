import { observable, action, makeAutoObservable, computed } from "mobx";
import firestore from '@react-native-firebase/firestore';

export default class FavProdStore {
    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @observable favProdItems = [];

    @computed get itemCount() {
        return this.favProdItems.reduce((total, item) => total + item.noOfItems, 0);
    }

    @action
    initialState = () => {
        this.favProdItems = [];
    }

    @action
    init = async (profileInfo) => {
        try {
            await this.fetchFavProdItem(profileInfo);
        } catch (e) {
            console.error('Error initializing store:', e);
        }
    }

    @action
    fetchFavProdItem = async (profileInfo) => {
        try {
            const { id, authProvider } = profileInfo;
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.favProdItems = userData.favProducts || [];
            } else {
                console.error('User data not found');
            }
        } catch (e) {
            console.error('Error fetching favProducts items:', e);
        }
    }

    @action
    addItemToFavourites = async (product, userInfo) => {
        const { id, authProvider } = userInfo;
        try {
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            console.log(querySnapshot)
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedFavProducts = this.updateFavouritesWithProduct(userData.favProducts, product);
                await userDocRef.update({ favProducts: updatedFavProducts });
                this.favProdItems = updatedFavProducts;
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error adding item to favProducts:', error);
        }
    }

    @action
    removeItemFromFavourites = async (product, userInfo) => {
        const { id, authProvider } = userInfo;
        try {
            const querySnapshot = await this.getUserQuerySnapshot(authProvider, id);
            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                const userData = querySnapshot.docs[0].data();
                const updatedFavProducts = userData.favProducts.filter((item) => item.id !== product.id);
                await userDocRef.update({ favProducts: updatedFavProducts });
                this.favProdItems = updatedFavProducts;
            } else {
                console.error('User data not found');
            }
        } catch (error) {
            console.error('Error removing item from favProducts:', error);
        }
    }

    getUserQuerySnapshot = async (authProvider, id) => {
        const collectionName = authProvider === 'email' ? 'RegisteredUsers' : 'UsersLoggedUsingGoogle';
        return await firestore().collection(collectionName).where('id', '==', id).get();
    }

    updateFavouritesWithProduct = (favProducts, product) => {
        const productIndex = favProducts.findIndex((item) => item.id === product.id);
        if (productIndex === -1) {
                return [{ ...product}, ...favProducts];
        } else return favProducts
    }
}