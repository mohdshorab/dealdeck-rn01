import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, showNotificationIcon }) => {
    const navigation = useNavigation();

    const handleNotificationPress = () => {
        // navigate to the notification screen
        navigation.navigate('Notifications');
    };

    return (
        <View style={styles.header}>
            <View style={styles.left}>
                {title.trim() !== 'DealDeck' ? (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-back-sharp" size={24} color="white" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity >
                        <Icon name="menu" size={24} color="white" />
                    </TouchableOpacity>
                )}
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
        marginBottom:15
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
});
