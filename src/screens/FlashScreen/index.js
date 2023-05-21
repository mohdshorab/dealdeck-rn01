import React from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';
import dealdeck_logo from '../../assets/images/dealdeck_logo.png';
const FlashScreen = () => {

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.iconView} >
                <Image resizeMode="contain" style={styles.flashScreenLogo} source={dealdeck_logo} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        backgroundColor:"#fff"
    },
    flashScreenLogo: {
        maxHeight: 200,
        width: 200,
    },
    iconView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default FlashScreen;