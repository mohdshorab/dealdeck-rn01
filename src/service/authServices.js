import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const checkUserExistOrNotInFSTore = async (email, password = '') => {
    try {
        const querySnapshot = await firestore()
            .collection('Users')
            .where('user.email', '==', email)
            .where('user.password', '==', password)
            .get();
        return querySnapshot;
    } catch (error) {
        console.log('Error checking user existence fb service : ', error);
        throw error;
    }
}


export const checkUserExistOrNotInFSToreForGoogleSignIn = async (email) => {
    try {
        if (!email) {
            throw new Error('Email is required to check user existence.');
        }

        console.log('Checking user existence for email:', email);

        const querySnapshot = await firestore()
            .collection('Users')
            .where('user.email', '==', email)
            .get();

        console.log('QuerySnapshot:', querySnapshot);
        return querySnapshot;
    } catch (error) {
        console.log('Error checking user existence in Firestore:', error);
        throw error;
    }
};

export const loginWithEmailAndPassword = async (data) => {
    try {
        const userDoc = await checkUserExistOrNotInFSTore(data.email, data.password);
        if (userDoc) {
            userDoc.isLoggedIn = true;
            // Create a new object in the "loggedInUsers" collection with the additional "status" key
            await firestore().collection('loggedInUsers').add(userDoc);
            return { ...userDoc, status: 'success' };
        } else {
            return { status: false }; //
        }
    } catch (error) {
        console.log('Error checking user existence fb service while logging in : ', error);
        return { status: 'error' };
    }
}

export const registerUserToFirestore = async (userObject) => {
    try {
        console.log('userObject',userObject)
        const docID = userObject.id.toString();
        const usersCollection = firestore().collection('Users');
        console.log('DEBUG1', docID, usersCollection)
        // Add the new user object to Firestore with an automatically generated document ID
        await usersCollection.doc(docID).set(userObject);
        console.log('DEBUG2')
        return { ...userObject, status: 'success' };
    } catch (error) {
        console.log('Error registering user:', error);
        return { status: 'error' };
    }
}

export const updateUserObject = async (userSnapshot, deviceId) => {
    try {
        // User already exists, update loggedInDevices and noOfLoggedInDevices
        const userDocRef = userSnapshot.docs[0].ref;
        const userData = userSnapshot.docs[0].data();
        const existingDeviceIndex = userData.loggedInDevices.findIndex(
            (device) => device.deviceId === deviceId
        );
        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
        if (existingDeviceIndex !== -1) {
            // Device already logged in, update loginCount and loginTime
            userData.loggedInDevices[existingDeviceIndex] = {
                ...userData.loggedInDevices[existingDeviceIndex],
                loginTime: currentTime,
                loginCount: userData.loggedInDevices[existingDeviceIndex].loginCount + 1,
            };
        } else {
            // New device, add to loggedInDevices
            userData.loggedInDevices.push({
                deviceId,
                loginMethod: 'google',
                loginTime: currentTime,
                loginCount: 1,
            });
            userData.noOfLoggedInDevices += 1;
        }
        await userDocRef.update({
            loggedInDevices: userData.loggedInDevices,
            noOfLoggedInDevices: userData.noOfLoggedInDevices,
        });
        return { status: 'success', userData };
    }
    catch (error) {
        console.log('Error updating user:', error);
        return { status: 'error' };
    }
}

export const registerUserFromGoogleSignIn = async () => {

}


