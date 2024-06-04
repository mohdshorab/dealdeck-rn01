import { action, makeAutoObservable, observable } from "mobx";
import { getTheQuerySnapshot, updateGoogleUserOnFS, loginWithEmailAndPassword, registerUserEmailPassToFirestore, getTheQuerySnapshotOfGoogleUsers } from "../service/authServices";
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
                if (res?.status) {
                    this.profileData = res;
                    return true;
                }
                else {
                    return false;
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
            const { user } = result;
            const userSnapshot = await getTheQuerySnapshotOfGoogleUsers(user.email);
            const res = await updateGoogleUserOnFS(result.user, userSnapshot)
            if (res?.status) {
                this.profileData = res
                return true
            }
            else return res
        } catch (error) {
            console.log('Error during Google Sign-In:', error);
            GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            return { status: false };
        }
    };



    @action
    registerUser = async (data) => {
        const { selectedImageURI, firstName, lastName, email, phone, passwordAgain } = data;
        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        const deviceId = generateDeviceId(); // Generate a unique device ID
        try {
            const userSnapshot = await getTheQuerySnapshot(email, passwordAgain);
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
                    recentlyViewedProducts: [],
                    savedCards: [],
                    savedAddresses: [],
                    orderedProducts: [],
                    cart:[],
                    username: firstName,
                    createdAt: currentTime,
                    updatedAt: null,
                    authProvider: 'email',
                };
                const res = await registerUserEmailPassToFirestore(newUserObject);
                if (res?.status) return res;
            }
            else return res;
        }
        catch (error) {
            console.log('Error during Google Sign-In:', error);
            return { status: 'false', message: 'Error, Please connect with @dealdeck' };
        }


    };

}