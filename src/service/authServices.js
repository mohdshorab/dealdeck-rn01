import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { generateDeviceId } from '../utils';
import moment from 'moment';

export const getTheQuerySnapshot = async (email, password) => {
    try {
        const querySnapshot = await firestore()
            .collection('RegisteredUsers')
            .where('user.email', '==', email)
            .where('user.password', '==', password)
            .get();
        return querySnapshot;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
}

export const getTheQuerySnapshotOfGoogleUsers = async (email) => {
    if (!email) {
        throw new Error('Email is required to check user existence.');
    }

    try {
        const querySnapshot = await firestore()
            .collection('UsersLoggedUsingGoogle')
            .where('user.email', '==', email)
            .get();

        return querySnapshot;
    } catch (error) {
        console.error('Error checking user existence in Firestore:', error);
        throw error;
    }
};

export const loginWithEmailAndPassword = async (userSnapshot, deviceId) => {
    try {
        const userDocRef = userSnapshot.docs[0].ref;
        const userData = userSnapshot.docs[0].data();
        const { loggedInDevices, noOfLoggedInDevices } = await updateLoggedInDevices(userData, deviceId);

        await userDocRef.update({
            loggedInDevices,
            noOfLoggedInDevices,
        });

        return { status: true, ...userData };
    } catch (error) {
        console.error('Error logging in:', error);
        return { status: false };
    }
}

export const registerUserEmailPassToFirestore = async (userObject) => {
    try {
        const docID = userObject.id.toString();
        const usersCollection = firestore().collection('RegisteredUsers');
        await usersCollection.doc(docID).set(userObject);
        return { status: true };
    } catch (error) {
        console.error('Error registering user:', error);
        return { status: false };
    }
}

export const updateGoogleUserOnFS = async (googleUser, userSnapshot) => {
    const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    const deviceId = generateDeviceId();

    try {
        const usersCollection = firestore().collection('UsersLoggedUsingGoogle');

        if (userSnapshot.empty) {
            const newUserObject = createNewGoogleUserObject(googleUser, deviceId, currentTime);
            const newDocRef = usersCollection.doc(); // Get a new document reference
            await newDocRef.set({ ...newUserObject, id: newDocRef.id }); // Set the document data
            return { ...newUserObject, id: newDocRef.id, status: true };
        } else {
            const userDocRef = userSnapshot.docs[0].ref;
            const userData = userSnapshot.docs[0].data();
            const { loggedInDevices, noOfLoggedInDevices } = await updateLoggedInDevices(userData, deviceId, currentTime);

            await userDocRef.update({
                loggedInDevices,
                noOfLoggedInDevices,
            });

            return { ...userData, status: true };
        }
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
        return { status: false, message: 'Error, Please connect with @dealdeck' };
    }
};

export const ensureGooglePlayServices = async () => {
    try {
        await GoogleSignin.hasPlayServices();
    } catch (error) {
        console.error('Google Play Services not available:', error);
        throw error;
    }
}

export const handleGoogleSignInError = async () => {
    try {
        GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        console.error('Error revoking access or signing out:', error);
    }
}

export const createNewUserObject = (email, passwordAgain, selectedImageURI, firstName, lastName, phone, currentTime, deviceId, userSnapshot) => {
    const newId = userSnapshot.size + 1; // You can update this logic to generate a unique id
    return {
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
        cart: [],
        username: firstName,
        createdAt: currentTime,
        updatedAt: null,
        authProvider: 'email',
    };
}

const createNewGoogleUserObject = (googleUser, deviceId, currentTime) => {
    return {
        user: {
            email: googleUser.email,
            avatar: googleUser.photo,
            fname: googleUser.givenName,
            lname: googleUser.familyName,
            mobile: '',
        },
        noOfLoggedInDevices: 1,
        loggedInDevices: [
            {
                deviceId,
                loginTime: currentTime,
                loginCount: 1,
            },
        ],
        savedProducts: [],
        favProducts: [],
        recentlyViewedProducts: [],
        savedCards: [],
        savedAddresses: [],
        orderedProducts: [],
        cart: [],
        username: googleUser.givenName,
        createdAt: currentTime,
        updatedAt: null,
        authProvider: 'google',
        googleId: googleUser.id,
    };
}

const updateLoggedInDevices = async (userData, deviceId, currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')) => {
    const existingDeviceIndex = userData.loggedInDevices.findIndex(
        (device) => device.deviceId === deviceId
    );

    if (existingDeviceIndex !== -1) {
        // Device already logged in, update loginCount and loginTime
        const updatedLoggedInDevices = [...userData.loggedInDevices];
        updatedLoggedInDevices[existingDeviceIndex] = {
            ...updatedLoggedInDevices[existingDeviceIndex],
            loginTime: currentTime,
            loginCount: updatedLoggedInDevices[existingDeviceIndex].loginCount + 1,
        };
        return {
            loggedInDevices: updatedLoggedInDevices,
            noOfLoggedInDevices: userData.noOfLoggedInDevices,
        };
    } else {
        // New device, add to loggedInDevices
        const updatedLoggedInDevices = [
            ...userData.loggedInDevices,
            {
                deviceId,
                loginTime: currentTime,
                loginCount: 1,
            },
        ];
        return {
            loggedInDevices: updatedLoggedInDevices,
            noOfLoggedInDevices: userData.noOfLoggedInDevices + 1,
        };
    }
}