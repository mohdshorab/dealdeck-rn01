import { action, makeAutoObservable, observable } from "mobx";
import { getTheQuerySnapshot, getTheQuerySnapshotOfGoogleUsers, loginWithEmailAndPassword, registerUserEmailPassToFirestore, updateUserObject, updateGoogleUserObject, registerGoogleUserToFirestore } from "../service/authServices";
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
        try {
            const deviceId = generateDeviceId(); // Generate a unique device ID
            const userSnapshot = await getTheQuerySnapshot(data.email, data.password);
            if (!userSnapshot.empty) {
                const res = await loginWithEmailAndPassword(userSnapshot, deviceId);
                if (res?.status === 'success') {
                    this.profileData = res;
                    return res;
                }
                if (res?.status === false) {
                    return { message: "Please check your email and password, or try sign-up" };
                }
            }
        }
        catch (error) {
            console.log(error)
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
            const userSnapshot = await getTheQuerySnapshotOfGoogleUsers(googleUser.email);
            if (userSnapshot.empty) {
                const newId = userSnapshot.size + 1;
                const newUserObject = {
                    id: newId,
                    user: {
                        email: googleUser.email,
                        avatar: googleUser.photo,
                        fname: googleUser.givenName,
                        lname: googleUser.familyName,
                        mobile: '',
                    },
                    noOfLoggedInDevices: 0,
                    loggedInDevices: [
                        {
                            deviceId: deviceId,
                            loginTime: currentTime,
                            loginCount: 0,
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
                const res = await registerGoogleUserToFirestore(newUserObject);
                return res;
            } else {
                const res = await updateGoogleUserObject(userSnapshot, deviceId);
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
        const userSnapshot = await getTheQuerySnapshot(email, passwordAgain);
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
                    noOfLoggedInDevices: 0,
                    loggedInDevices: [
                        {
                            deviceId,
                            loginTime: currentTime,
                            loginCount: 0,
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
                };
                const res = await registerUserEmailPassToFirestore(newUserObject);
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