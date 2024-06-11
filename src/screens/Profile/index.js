import React, { useEffect } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/Header";
import profileIcon from '../../assets/images/profileIcon.png';
import { useStore } from "../../store";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { observer } from "mobx-react";
import CustomButton from "../../components/Button";

const Profile = observer(({ navigation }) => {
    const { auth, products } = useStore();
    const { user } = auth?.profileData;

    useEffect(() => {
        console.log('products.recentlyViewedProducts', products.sponsoredItem);
        console.log('auth.profileData', auth.profileData);
    }, []);

    const renderRecentlyViewedItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', { productData: item })}
            style={styles.productTile}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.productImage} resizeMode="contain" />
            <Text style={styles.productBrand}>{item.brand}</Text>
            <Text style={styles.productName}>{item.title.split(" ").splice(-3).join(" ")}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>${item.price}</Text>
                <FontAwesome name="chevron-right" color="green" size={13} />
                <Text style={styles.productDiscountPrice}>
                    ${(item.price - (item.price * item.discountPercentage) / 100).toFixed(0)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader titleOnHead={'Your Profile'} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
                <View style={styles.profileContainer}>
                    {user && user.avatar ? (
                        <Image style={styles.profileImage} source={{ uri: user.avatar }} />
                    ) : (
                        <Image style={styles.profileImage} source={profileIcon} />
                    )}
                    <Text style={styles.userNameText}>
                        {user && user.fname ? `Hey, ${user.fname}` : 'Syncing Error'}
                    </Text>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsContainer}>
                        <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('favProds')}>
                            <FontAwesome name={'heart'} size={22} color={'red'} />
                            <Text style={styles.quickActionText}>Favourites</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickActionButton}>
                            <FontAwesome name={'gift'} size={24} color={'orange'} />
                            <Text style={styles.quickActionText}>Coupons</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recently Viewed</Text>
                    {products.recentlyViewedProducts && products.recentlyViewedProducts.length > 0 ? (
                        <FlatList
                            data={products.recentlyViewedProducts}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderRecentlyViewedItem}
                        />
                    ) : (
                        <Text style={styles.noItemsText}>No recently viewed items.</Text>
                    )}
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>My Orders</Text>
                    <TouchableOpacity style={styles.orderButton}>
                        <Text style={styles.orderButtonText}>View Orders</Text>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>
                    <TouchableOpacity style={styles.menuItemContainer}>
                        <View style={styles.menuItemTextContainer}>
                            <Ionicons name={'person-outline'} size={24} color={'#4a4b4d'} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Edit Profile</Text>
                        </View>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItemContainer}>
                        <View style={styles.menuItemTextContainer}>
                            <FontAwesome name={'credit-card-alt'} size={24} color={'#4a4b4d'} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Saved Cards</Text>
                        </View>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItemContainer}>
                        <View style={styles.menuItemTextContainer}>
                            <Ionicons name={'location-outline'} size={24} color={'#4a4b4d'} style={styles.menuItemIcon} />
                            <Text style={styles.menuItemText}>Saved Addresses</Text>
                        </View>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={24} />
                    </TouchableOpacity>
                </View>

                <CustomButton
                    title={'Logout'}
                    buttonStyle={styles.logoutButton}
                    textStyle={styles.logoutButtonText}
                    onPress={() => auth.googleSignOut() && navigation.navigate('logInForm')}
                />
            </ScrollView>
        </SafeAreaView>
    );
});

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContentContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 20,
    },
    profileImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        borderRadius: 100,
        marginHorizontal: 10,
    },
    userNameText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#4a4b4d',
    },
    sectionContainer: {
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 10,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    quickActionButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    quickActionText: {
        color: '#4a4b4d',
        fontSize: 14,
        fontWeight: '600',
        paddingTop: 5,
    },
    menuItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuItemTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemIcon: {
        marginRight: 10,
    },
    menuItemText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#4a4b4d',
    },
    orderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    orderButtonText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#4a4b4d',
    },
    productTile: {
        padding: 10,
        borderRadius: 20,
        margin: 10,
        borderWidth: 1,
        width: 150,
        borderColor: '#999999',
    },
    productImage: {
        width: '100%',
        height: 100,
    },
    productBrand: {
        fontWeight: 'bold',
        marginTop: 2,
        textAlign: 'center',
        color: '#4a4b4d',
    },
    productName: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productPrice: {
        color: 'green',
        textDecorationLine: 'line-through',
        marginTop: 2,
    },
    productDiscountPrice: {
        color: 'green',
        marginTop: 2,
    },
    noItemsText: {
        fontWeight: '500',
        fontSize: 16,
        color: '#4a4b4d',
        textAlign: 'center',
    },
    logoutButton: {
        height: 50,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});