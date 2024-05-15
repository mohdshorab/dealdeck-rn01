import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, showNotificationIcon, canGoBack, FullHeader }) => {
    const navigation = useNavigation();

    const handleNotificationPress = () => {
        // navigate to the notification screen
        navigation.navigate('Notifications');
    };

    


    const HomeHead = () => {
        return (
            <View style={styles.header}>
                <View style={styles.left}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require("../../assets/images/dealdeck_logo.png")} style={{ height: 30, width: 30, resizeMode: 'contain', borderRadius:35 }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.center}>
                    <Text style={styles.title}>{title ? title : 'Deal Deck'}</Text>
                </View>
                <View style={styles.right}>
                    {showNotificationIcon ? (
                        <TouchableOpacity onPress={handleNotificationPress}>
                            <Icon name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Icon name="shopping-cart" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    const ProdDetailsHead = () => {
        return (
            <View style={styles.prodDetailsHeader}>
                <View style={styles.left}>
                    {canGoBack ? (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.prodDetailsBack}>
                            <Icon name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={styles.prodDetailsRight}>
                    < View style={{ flexDirection: 'row', }} >
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 45 }} >
                            <Icon name="heart" size={24} color="red" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                            <Icon name="share" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return (
        FullHeader ? <HomeHead /> : <ProdDetailsHead />
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#00C0FF',
        marginBottom: 15
    },
    prodDetailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
    },
    left: {
        // flex: 1,
        left: -10
    },
    center: {
        flex: 3,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
    },
    prodDetailsBack: {
        borderRadius: 25,
        // backgroundColor: '#C3E704',
        height: 30, width: 30,
        alignItems: 'center'
    },
    prodDetailsRight: {
        flex: 1,
        alignItems: 'flex-end',
        // flexDirection: 'row'
    }
});
