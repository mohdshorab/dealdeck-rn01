import firestore from '@react-native-firebase/firestore';

export const checkUserExistOrNotInFSTore = async (email) => {
    try {
        const querySnapshot = await firestore().collection('users').where('email', '==', email).get();
        if (!querySnapshot.empty) {
            // User exists
            // const user = querySnapshot.docs[0].data();
            const userId = querySnapshot.docs[0].id;
            console.log('User already exist', userId);
            return true;
        } else {
            // User does not exist
            return false;
        }
    } catch (error) {
        console.log('Error checking user existence fb service : ', error);
        throw error;
    }
}

export const registerUserToFirestore = async (user) => {

    const { selectedImageURI, firstName, lastName, email, phone, passwordAgain } = user;
    // Create a new user object
    const newUser = {
        image: selectedImageURI,
        fullname: firstName + ' ' + lastName,
        email,
        mobile: phone,
        password: passwordAgain
    };
    console.log('New user detail :', newUser);

    try {
        // Add the new user object to Firestore with an automatically generated document ID
        await firestore().collection('users').add(newUser);
        // console.log('docref',docRef);
        return true;
    } catch (error) {
        console.log('Error registering user:', error);
        return false;
    }
}
