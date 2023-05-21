import React, { useState, useEffect } from "react";
import {
    SafeAreaView, Text, View
} from "react-native";
import CustomHeader from "../../components/Header";
import auth from '@react-native-firebase/auth';


const Main = ({ navigation }) => {
    // return (
    //     <SafeAreaView style={{flex:1, backgroundColor:"#fff"}} >
    //         <CustomHeader title={'DealDeck'}  />
    //         <View>
    //             <Text>Hi, username</Text>
    //         </View>
    //     </SafeAreaView>
    // )


    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View>
                <Text>Login</Text>
            </View>
        );
    }

    return (
        <View>
            <CustomHeader title={'DealDeck'} />
            <Text>Welcome {user.email}</Text>
        </View>
    );

}

export default Main;