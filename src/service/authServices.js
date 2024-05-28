import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const checkUserExistOrNotInFSTore = async (email, password) => {
    try {
        const querySnapshot = await firestore()
            .collection('users')
            .where('email', '==', email)
            .where('password', '==', password)
            .get();
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); // Assuming there's only one user with the given email and password
            return userData;
        } else {
            // User does not exist
            return null;
        }
    } catch (error) {
        console.log('Error checking user existence fb service : ', error);
        throw error;
    }
}

export const loginWithEmailAndPassword = async (data) => {
    try {
        const userDoc = await checkUserExistOrNotInFSTore(data.email, data.password);

        if (userDoc) {
            const userId = userDoc.id;
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

export const registerUserToFirestore = async (user) => {
    const { selectedImageURI, firstName, lastName, email, phone, passwordAgain } = user;
    const userExist = await checkUserExistOrNotInFSTore(email, passwordAgain);
    const usersCollection = firestore().collection('Users');
    console.log('usersCollection:', usersCollection);
    const querySnapshot = await usersCollection.get();
    let newId = 0;
    newId = querySnapshot.size + 1;
    console.log('usersCollection:', newId);

    if (userExist) {
        return { status: 'exist' };
    }
    const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    // Create a new user object
    const newUser =
    {
        id: newId,
        data: {
            email: email,
            password: passwordAgain,
            avatar: selectedImageURI,
            fullname: firstName + '' + lastName,
            fname: firstName,
            lname: lastName,
            mobile: phone,
        },
        username: firstName,
        createdAt: currentTime,
        updatedAt: null,
        isLoggedIn: false,
    }
    try {
        console.log('DEBUG');
        // Add the new user object to Firestore with an automatically generated document ID
        await usersCollection.doc(newId.toString()).set(newUser);
        return { ...newUser, status: 'success' };
    } catch (error) {
        console.log('Error registering user:', error);
        return { status: 'error' };
    }
}


