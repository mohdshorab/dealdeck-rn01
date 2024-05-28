import { action, makeAutoObservable, observable } from "mobx";
import { loginWithEmailAndPassword, registerUserToFirestore } from "../service/authServices";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
            return { message: "Please check your email and password, or try sign-up" };
        }
        if (res?.status === 'error') {
            return { message: 'Error encountered, Please connect with @dealdeck team' }
        }

    }

    @action
    registerUser = async (data) => {
        const res = await registerUserToFirestore(data);
        if (res?.status === 'success') {
            return res;
        }
        if (res?.status === 'exist') { return { message: 'User already exist, please login.' } }
        if (res?.status === 'error') { return { message: 'Error encountered, Please connect with @dealdeck team' } }
    }

    @action
    googleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn().then(async (result) => {
                this.email = result.user.email;
                console.log("Google SSO Response ===> ", result);
                if (response.status == 1) {
                    console.log('SIGNEDIN')
                }
                else {
                    this.isLoading = false
                    console.log('Revoking access and signin out');
                    GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                }
            });
        } catch (error) {
            showAlert(`${error}`);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User cancelled the login flow !');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('in-progress !');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Google play services not available or outdated !');
            } else {
                console.log(error)
                this.isLoading = false
            }
        }
    }

}