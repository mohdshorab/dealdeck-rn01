import firestore from '@react-native-firebase/firestore';
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
        console.log('Error checking user existence fb service : ', error);
        throw error;
    }
}



export const getTheQuerySnapshotOfGoogleUsers = async (email) => {
    try {
        if (!email) {
            throw new Error('Email is required to check user existence.');
        }
        console.log('Checking user existence for email:', email);

        const querySnapshot = await firestore()
            .collection('UsersLoggedUsingGoogle')
            .where('user.email', '==', email)
            .get();

        console.log('QuerySnapshot:', querySnapshot);
        return querySnapshot;
    } catch (error) {
        console.log('Error checking user existence in Firestore:', error);
        throw error;
    }
};



export const loginWithEmailAndPassword = async (userSnapshot, deviceId) => {
    try {
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
                deviceId: deviceId,
                loginTime: currentTime,
                loginCount: 1,
            });
            userData.noOfLoggedInDevices += 1;
        }
        await userDocRef.update({
            loggedInDevices: userData.loggedInDevices,
            noOfLoggedInDevices: userData.noOfLoggedInDevices,
        });
        return { status: true, ...userData };
    } catch (error) {
        console.log('Error checking user existence fb service while logging in : ', error);
        return { status: false };
    }
}

export const registerUserEmailPassToFirestore = async (userObject) => {
    try {
        const docID = userObject.id.toString();
        const usersCollection = firestore().collection('RegisteredUsers');
        // Add the new user object to Firestore with an automatically generated document ID
        await usersCollection.doc(docID).set(userObject);
        return { status: true };
    } catch (error) {
        console.log('Error registering user:', error);
        return { status: false };
    }
}


export const updateGoogleUserOnFS = async (googleUser, userSnapshot) => {
    console.log('GoogleUser', googleUser)
    const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    const deviceId = generateDeviceId(); // Generate a unique device ID
    try {
        const usersCollection = firestore().collection('UsersLoggedUsingGoogle');

        if (userSnapshot.empty) {
            const newUserObject = {
                id: userSnapshot.size + 1, // Assuming userSnapshot.size can be used to generate a new ID
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
                        deviceId: deviceId,
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
                cart:[],
                username: googleUser.givenName,
                createdAt: currentTime,
                updatedAt: null,
                authProvider: 'google',
                googleId: googleUser.id,
            };

            const docID = newUserObject.id.toString();
            await usersCollection.doc(docID).set(newUserObject);
            return { ...newUserObject, status: true };
        } else {
            const userDocRef = userSnapshot.docs[0].ref;
            const userData = userSnapshot.docs[0].data();
            const existingDeviceIndex = userData.loggedInDevices.findIndex(
                (device) => device.deviceId === deviceId
            );

            if (existingDeviceIndex !== -1) {
                userData.loggedInDevices[existingDeviceIndex] = {
                    ...userData.loggedInDevices[existingDeviceIndex],
                    loginTime: currentTime,
                    loginCount: userData.loggedInDevices[existingDeviceIndex].loginCount + 1,
                };
            } else {
                userData.loggedInDevices.push({
                    deviceId: deviceId,
                    loginTime: currentTime,
                    loginCount: 1,
                });
                userData.noOfLoggedInDevices += 1;
            }

            await userDocRef.update({
                loggedInDevices: userData.loggedInDevices,
                noOfLoggedInDevices: userData.noOfLoggedInDevices,
            });

            return { ...userData, status: true };
        }
    } catch (error) {
        console.log('Error during Google Sign-In:', error);
        return { status: false, message: 'Error, Please connect with @dealdeck' };
    }
};

