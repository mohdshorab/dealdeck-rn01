import { action, makeAutoObservable, observable } from "mobx";
import { loginWithEmailAndPassword, registerUserToFirestore } from "../service/authServices";

export default class AuthStore {

    @observable profileData
    @observable isLoading
    @observable isLogout
    @observable notificationList
    @observable showPassword
    @observable isLoggedIn
    @observable showLoader

    constructor(store) {
        this.store = store;
        makeAutoObservable(this);
        this.initialState();
    }

    @action
    initialState = () => {
        this.showPassword = false;
        this.profileData = {};
        this.isLoading = false;
        this.isLogout = false;
        this.notificationList = [];
        this.isLoggedIn = true;
        this.showLoader = false;
    }

    @action
    willShowPassword = (bool) => {
        this.showPassword = bool;
    }

    @action
    login = async (data) => {
        this.showLoader = true;
        const res = await loginWithEmailAndPassword(data);
        if (res?.status === 'success') {
            this.profileData = res;
            this.isLoggedIn = true;
            this.showLoader = false;
            return res;
        }
        if (res?.status === false) {
            this.showLoader = false;
            return { message: "Please check your email and password, or try sign-up"};
        }
        if (res?.status === 'error') {
            this.showLoader = false;
            return { message: 'Error encountered, Please connect with @dealdeck team' }
        }

    }

    @action
    registerUser = async (data) => {
        this.showLoader = true;
        const res = await registerUserToFirestore(data);
        if (res?.status === 'success') {
            this.showLoader = false;
            return res;
        }
        if (res?.status === 'exist') { this.showLoader = false; return { message: 'User already exist, please login.' } }
        if (res?.status === 'error') { { this.showLoader = false; return { message: 'Error encountered, Please connect with @dealdeck team' } } }
    }

}