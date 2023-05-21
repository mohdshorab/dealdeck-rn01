import React from "react";
import { action, makeAutoObservable, observable } from "mobx";
import { checkUserExistOrNotInFSTore, registerUserToFirestore } from "../service/signUpServices";

export default class AuthStore {

    @observable profileData
    @observable isLoading
    @observable isLogout
    @observable userData
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
        this.userData = {};
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
        const res = await login(data);
    }

    @action
    registerUser = async (data) => {
        console.log('res', data)
        this.showLoader = true;
        const userDontExist = await checkUserExistOrNotInFSTore(data.email);
        console.log('user exist',userDontExist);
        if (!userDontExist) {
            const res = await registerUserToFirestore(data);
            console.log(res);
            return res;
        }

    }

}