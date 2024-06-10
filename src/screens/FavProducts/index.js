import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { useStore } from '../../store';
import CustomHeader from '../../components/Header';
import MaterialIcon from 'react-native-vector-icons/Entypo'

const FavProducts = observer(({ navigation }) => {

    const { auth,cart, favProd } = useStore();

    useEffect(() => {
        favProd.fetchFavProdItem(auth.profileData)
    }, [])
    

    const renderItem = ({ item }) => (
        <View style={styles.subContainer} >
            <TouchableOpacity style={styles.categoryContainer} onPress={() => { navigation.navigate('ProductDetail', { productData: item }) }} >
                <Image source={{ uri: item.thumbnail }} style={styles.categoryImage} />
                <View  style={{ flexDirection: 'column' }} >
                    <Text style={styles.brandText}>Brand: {item.brand}</Text>
                    <Text style={styles.categoryText} numberOfLines={2} >{item.title}</Text>
                    <Text style={styles.priceText}>just @{item.price}</Text>
                </View>
                <MaterialIcon name="chevron-thin-right" size={30} color='#4a4b4d' />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.5, borderTopWidth: 0.5, }} >
                <TouchableOpacity
                    style={{ alignItems: 'center', padding: 5, width: '50%', borderRightWidth: 0.5 }}
                    onPress={async () => await cart.addItemToCart(item, auth.profileData)}
                >
                    <Text style={{ color: 'black', fontWeight: '500' }} >Add to cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', padding: 5, width: '50%' }}
                    onPress={async () => await favProd.removeItemFromFavourites(item, auth.profileData)}
                >
                    <Text style={{ color: 'black', fontWeight: '500' }} >Remove from Favourites</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader titleOnHead={'Favourites'} navigation={navigation} showCart />
            <FlatList
                data={favProd.favProdItems}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
});

export default FavProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        borderRadius: 20,
        // width: '95%',
        marginHorizontal: 10,
        backgroundColor: 'white',
        justifyContent: 'space-evenly'

    },
    categoryImage: {
        width: 100,
        height: 100,
        borderRadius: 20
    },
    categoryText: {
        fontWeight: '500',
        width: '50%',
        fontSize: 16,
        color: 'black'
    },
    priceText: {
        fontSize: 14,
        fontWeight: '300'
    },
    brandText: {
        fontWeight: '500',
        fontSize: 14
    },
    subContainer: {
        backgroundColor: 'white',
        marginVertical: 10,
        ...Platform.select({
            android: {
                elevation: 10,
            },
        }),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            },
        }),
    }
});
