import { action, makeAutoObservable, observable } from "mobx";
import { getTheQuerySnapshot, updateGoogleUserOnFS, loginWithEmailAndPassword, registerUserEmailPassToFirestore, getTheQuerySnapshotOfGoogleUsers, ensureGooglePlayServices, handleGoogleSignInError, createNewUserObject } from "../service/authServices";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import moment from 'moment';
import { generateDeviceId } from "../utils";

export default class AuthStore {
    @observable profileData;
    @observable isLoading;
    @observable isLogout;
    @observable notificationList;
    @observable showPassword;
    @observable isLoggedIn;

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
            const deviceId = generateDeviceId();
            const userSnapshot = await getTheQuerySnapshot(data.email, data.password);
            if (!userSnapshot.empty) {
                const res = await loginWithEmailAndPassword(userSnapshot, deviceId);
                if (res?.status) {
                    this.profileData = res;
                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { message: 'Error encountered, Please connect with @dealdeck team' };
        }
    }

    @action
    googleSignIn = async () => {
        try {
            await ensureGooglePlayServices();
            const result = await GoogleSignin.signIn();
            const { user } = result;
            const userSnapshot = await getTheQuerySnapshotOfGoogleUsers(user.email);
            const res = await updateGoogleUserOnFS(result.user, userSnapshot);
            if (res?.status) {
                this.profileData = res;
                return true;
            } else {
                return res;
            }
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            await handleGoogleSignInError();
            return { status: false };
        }
    }

    @action
    registerUser = async (data) => {
        const { selectedImageURI, firstName, lastName, email, phone, passwordAgain } = data;
        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        const deviceId = generateDeviceId();
        try {
            const userSnapshot = await getTheQuerySnapshot(email, passwordAgain);
            if (userSnapshot.empty) {
                const newUserObject = createNewUserObject(email, passwordAgain, selectedImageURI, firstName, lastName, phone, currentTime, deviceId, userSnapshot);
                const res = await registerUserEmailPassToFirestore(newUserObject);
                if (res?.status) {
                    return res;
                }
            } else {
                return { status: false, message: 'User already exists' };
            }
        } catch (error) {
            console.error('Error during registration:', error);
            return { status: false, message: 'Error, Please connect with @dealdeck' };
        }
    }

    @action
    logout = async () => {
        try {
            const collectionName = this.profileData.authProvider === 'email' ? 'RegisteredUsers' : 'UsersLoggedUsingGoogle';
            const userSnapshot = await firestore().collection(collectionName).where('id', '==', id).get();
            if (!userSnapshot.empty) {
                const userDocRef = userSnapshot.docs[0].ref;
                const userData = userSnapshot.docs[0].data();
                const loggedDevices = userData.loggedInDevices;
                const currentDeviceID = generateDeviceId();
                const currentDeviceIndex = loggedDevices.findIndex(item => item.deviceId == currentDeviceID)
                if (currentDeviceIndex !== -1) {
                    loggedDevices.splice(currentDeviceIndex, 1);
                    await userDocRef.update({ loggedInDevices: loggedDevices });
                    return true
                }
                return false
            }
            return false
        }
        catch (e) {
            console.error('Error doing logout : ', e)
        }
    }

}