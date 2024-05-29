import { action, makeAutoObservable, observable } from "mobx";
import { checkUserExistOrNotInFSTore, checkUserExistOrNotInFSToreForGoogleSignIn, loginWithEmailAndPassword, registerUserToFirestore, updateUserObject } from "../service/authServices";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import moment from 'moment';
import { generateDeviceId } from "../utils";

export default class AuthStore {

    @observable profileData
    @observable isLoading
    @observable isLogout
    @observable notificationList
    @observable showPassword
    @observable isLoggedIn

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
    }

    @action
    willShowPassword = (bool) => {
        this.showPassword = bool;
    }

    @action
    login = async (data) => {
        const res = await loginWithEmailAndPassword(data);
        if (res?.status === 'success') {
            this.profileData = res;
            return res;
        }
        if (res?.status === false) {
            console.log('res status', res)
            return { message: "Please check your email and password, or try sign-up" };
        }
        if (res?.status === 'error') {
            return { message: 'Error encountered, Please connect with @dealdeck team' }
        }

    }

    @action
    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const result = await GoogleSignin.signIn();
            console.log(result)
            await this.updateGoogleUserOnFS(result.user)
            return { message: 'success' };
        } catch (error) {
            console.log('Error during Google Sign-In:', error);
            GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            return { message: 'Unable to perform signin' };
        }
    };

    @action
    updateGoogleUserOnFS = async (googleUser) => {
        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        const deviceId = generateDeviceId(); // Generate a unique device ID
        try {
            const userSnapshot = await checkUserExistOrNotInFSToreForGoogleSignIn(googleUser.email);
            if (userSnapshot.empty) {
                const newId = userSnapshot.size + 1;
                const newUserObject = {
                    id: newId,
                    user: {
                        email: googleUser.email,
                        password: '',
                        avatar: googleUser.photo,
                        fname: googleUser.givenName,
                        lname: googleUser.familyName,
                        mobile: '',
                    },
                    noOfLoggedInDevices: 1,
                    loggedInDevices: [
                        {
                            deviceId:deviceId,
                            loginMethod: 'google',
                            loginTime: currentTime,
                            loginCount: 1,
                        },
                    ],
                    savedProducts: [],
                    favProducts: [],
                    savedCards: [],
                    savedAddresses: [],
                    username: googleUser.givenName,
                    createdAt: currentTime,
                    updatedAt: null,
                    authProvider: 'google',
                    googleId: googleUser.id,
                };
                const res = await registerUserToFirestore(newUserObject);
                return res;
            } else {
                const res = await updateUserObject(userSnapshot, deviceId);
                if (res?.status === 'success') {
                    return res;
                }
                if (res?.status === 'error') {
                    return { message: 'Error, Please connect with @dealdeck team' };
                }
            }
        } catch (error) {
            console.log('Error during Google Sign-In:', error);
            return { message: 'Error, Please connect with @dealdeck' };
        }
    };



    @action
    registerUser = async (data) => {
        const { selectedImageURI, firstName, lastName, email, phone, passwordAgain } = data;
        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        const deviceId = generateDeviceId(); // Generate a unique device ID
        const userSnapshot = await checkUserExistOrNotInFSTore(email, passwordAgain);
        try {

            if (userSnapshot.empty) {
                const newId = userSnapshot.size + 1;
                const newUserObject = {
                    id: newId,
                    user: {
                        email,
                        password: passwordAgain,
                        avatar: selectedImageURI,
                        fname: firstName,
                        lname: lastName,
                        mobile: phone,
                    },
                    noOfLoggedInDevices: 1,
                    loggedInDevices: [
                        {
                            deviceId,
                            loginMethod: 'email',
                            loginTime: currentTime,
                            loginCount: 1,
                        },
                    ],
                    savedProducts: [],
                    favProducts: [],
                    savedCards: [],
                    savedAddresses: [],
                    username: firstName,
                    createdAt: currentTime,
                    updatedAt: null,
                    authProvider: 'email',
                    googleId: '',
                };
                const res = await registerUserToFirestore(newUserObject);
                if (res?.status === 'success') {
                    return res;
                }
                if (res?.status === 'exist') {
                    return { message: 'User already exists, please log in.' };
                }
                if (res?.status === 'error') {
                    return { message: 'Error, Please connect with @dealdeck' };
                }
            }
            else {
                return { status: 'exist' };
            }
        }
        catch (error) {
            console.log('Error during Google Sign-In:', error);
            return { message: 'Error, Please connect with @dealdeck' };
        }


    };

}