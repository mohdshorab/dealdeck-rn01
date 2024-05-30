import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/Header";
import profileIcon from '../../assets/images/profileIcon.png'
import { useStore } from "../../store";
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { observer } from "mobx-react";

const Profile = observer(() => {

    const { auth, products } = useStore();
    const { user } = auth.profileData

    const get = async () => {
        // const res = await fetchTheSponsoredProduct()
        // console.log(res.data)
    }

    useEffect(() => {
        console.log('products.recentlyViewedProducts', products.sponsoredItem)
        get()
    }, [])


    return (
        <SafeAreaView >
            <CustomHeader titleOnHead={'Your Profile'} />
            <ScrollView style={styles.scrollviewContainer} >
                <View style={styles.profileContainer} >
                    {user && user.avatar ? <Image style={styles.profileImage} source={{ uri: user.avatar }} />
                        :
                        <Image style={styles.profileImage} source={profileIcon} />
                    }
                    <Image />
                    {user && user.lname ? <Text style={styles.userNameText}>Hey, {user.lname}</Text>
                        :
                        <Text style={styles.userNameText}>Syncing Error</Text>}
                </View>
                <View style={styles.emptyView} />
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', width: '100%', alignSelf: 'center', paddingHorizontal: 10 }} >
                    <Text style={styles.myOrdersText} >My Orders</Text>
                    <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={30} />
                </TouchableOpacity>
                <View style={styles.emptyView} />
                <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'center', paddingVertical: 10 }} >
                    <Text style={styles.myOrdersText} >Account Setting</Text>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'space-between', backgroundColor: 'white', marginVertical: 10 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name={'user'} size={24} color={'#4a4b4d'} style={{ width: 20 }} />
                            <Text style={styles.profileMenuText} >Edit Profile</Text>
                        </View>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'space-between', backgroundColor: 'white', }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name={'credit-card-alt'} size={20} color={'#4a4b4d'} style={{ width: 20 }} />
                            <Text style={styles.profileMenuText} >Saved Cards</Text>
                        </View>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'space-between', backgroundColor: 'white', marginTop: 10 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name={'location-arrow'} size={30} color={'#4a4b4d'} style={{ width: 20 }} />
                            <Text style={styles.profileMenuText} >Saved Addresses</Text>
                        </View>
                        <FeatherIcon name='chevron-right' color={'#4a4b4d'} size={25} />
                    </TouchableOpacity>
                </View>
                <View style={styles.emptyView} />
                <View style={{ backgroundColor: 'white', width: '95%', alignSelf: 'center', paddingVertical: 10 }} >
                    <Text style={[styles.myOrdersText, { fontWeight: '400' }]} >Sponsored</Text>

                </View>
                <View style={styles.emptyView} />
                <View style={{ backgroundColor: 'white', paddingTop: 10 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginVertical: 10 }} >
                        <TouchableOpacity style={{ alignItems: 'center' }} >
                            <Ionicons name={'save-sharp'} size={40} color={'orange'} />
                            <Text style={{ color: '#4a4b4d', fontSize: 17, fontWeight: '600' }}>Saved Items</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} >
                            <FontAwesome name={'heart'} size={40} color={'red'} />
                            <Text style={{ color: '#4a4b4d', fontSize: 17, fontWeight: '600' }}>Favourites</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }} >
                            <FontAwesome name={'gift'} size={40} color={'orange'} />
                            <Text style={{ color: '#4a4b4d', fontSize: 17, fontWeight: '600' }}>Coupons</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.emptyView} />
                {
                    products.recentlyViewedProducts && products.recentlyViewedProducts.length > 0 ? (
                        <>
                            <Text style={styles.recentlyViewedText}>Recently viewed Items</Text>
                            <FlatList
                                data={products.recentlyViewedProducts}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ProductDetail', { productData: item })}
                                        style={styles.productTile}
                                    >
                                        <Image source={{ uri: item.thumbnail }} style={styles.productImage} resizeMode="contain" />
                                        <Text style={styles.productBrand}>{item.brand}</Text>
                                        <Text style={styles.productName}>{item.title.split(" ").splice(-3).join(" ")}</Text>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.productPrice}>${item.price}</Text>
                                            <Icon name="chevron-right" color="green" size={13} />
                                            <Text style={styles.productDiscountPrice}>
                                                ${(item.price - (item.price * item.discountPercentage) / 100).toFixed(0)}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </>
                    ) : null}
                {products.sponsoredItem && (
                    <View>
                        <Text>{products.sponsoredItem.title}</Text>
                    </View>

                )}
                <View style={styles.emptyView} />
                <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'space-evenly', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 10 }} >
                    <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, justifyContent: 'center', width: '100%', paddingVertical: 5 }}>
                        <FontAwesome name={'sign-out'} size={25} color={'#4a4b4d'} />
                        <Text style={[styles.profileMenuText, { fontWeight: '700', fontSize: 18 }]} >Logout</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
});

export default Profile;
const styles = StyleSheet.create({
    Subcontainer: {
        marginBottom: 10,
        paddingBottom: 10,
        backgroundColor: '#00c0ff',
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,

    },
    profileImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginVertical: 10,
        borderRadius: 100,
        marginHorizontal: 10
    },
    profileContainer: {
        // flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        width: '100%',
        backgroundColor: 'white',
    },
    userNameText: {
        fontWeight: 'bold',

        fontSize: 20,
        color: '#4a4b4d'
    },
    myOrdersText: {
        fontWeight: '600',
        fontSize: 18,
        color: 'black'
    },
    scrollviewContainer: {
        width: '100%',
        alignSelf: 'center'
    },
    emptyView: {
        height: 10
    },
    profileMenuText: {
        fontWeight: '400',
        fontSize: 18,
        color: '#4a4b4d',
        paddingLeft: 10
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


})