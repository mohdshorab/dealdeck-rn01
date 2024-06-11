import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, Text, View, Image, TouchableOpacity, Platform, Dimensions, StyleSheet } from 'react-native';
import { useStore } from '../../store';
import CustomHeader from '../../components/Header';
import MaterialIcon from 'react-native-vector-icons/Entypo'

const { width } = Dimensions.get('window');

const FavProducts = observer(({ navigation }) => {

    const { auth, cart, favProd } = useStore();

    useEffect(() => {
        favProd.fetchFavProdItem(auth.profileData)
    }, [])


    const renderItem = ({ item }) => (
        <View style={styles.subContainer} >
            <TouchableOpacity style={styles.categoryContainer} onPress={() => { navigation.navigate('ProductDetail', { productData: item }) }} >
                <Image source={{ uri: item.thumbnail }} style={styles.categoryImage} />
                <View style={{ flexDirection: 'column', paddingLeft:20 }} >
                    <Text style={styles.brandText}>Brand: {item.brand}</Text>
                    <Text style={styles.categoryText} numberOfLines={1} >{item.title}</Text>
                    <Text style={styles.priceText}>just @{item.price}</Text>
                </View>
                <MaterialIcon name="chevron-thin-right" size={30} color='#4a4b4d' />
            </TouchableOpacity>
            <View style={styles.BottomButtonView} >
                <TouchableOpacity
                    style={styles.removeFromFav}
                    onPress={async () => await cart.addItemToCart(item, auth.profileData)}
                >
                    <Text style={styles.removeFromFavText} >Remove from Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 5, }}
                    onPress={async () => await favProd.removeItemFromFavourites(item, auth.profileData)}
                >
                    <Text style={styles.addToCartText} >Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader titleOnHead={'Favourites'} navigation={navigation} showCart />
            {favProd?.favProdItems?.length > 0 ?
                <FlatList
                    data={favProd.favProdItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                />
                :
                <View style={styles.emptyCartContainer}>
                    <Image source={require('../../assets/images/noFavProd.png')} style={styles.emptyCartImage} />
                    <Text style={styles.emptyCartText}>No favourite products.</Text>
                    <Text style={styles.emptyCartSubText}>Add items to get started</Text>
                </View>}
        </SafeAreaView>
    );
});

export default FavProducts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    categoryImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    categoryText: {
        fontWeight: '500',
        width: width * 0.5,
        fontSize: 16,
        color: 'black',
    },
    priceText: {
        fontSize: 14,
        fontWeight: '300',
    },
    brandText: {
        fontWeight: '500',
        fontSize: 14,
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
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
        }),
        borderRadius: 10,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    emptyCartImage: {
        width: 200,
        height: 200,
    },
    emptyCartText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        color: '#333',
    },
    emptyCartSubText: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    BottomButtonView: { flexDirection: 'row', borderTopWidth: 0.5, justifyContent: 'space-around' },
    removeFromFav: { alignItems: 'center', padding: 5, borderRightWidth: 0.5 },
    removeFromFavText: { color: 'black', fontWeight: '500' },
    addToCartText: { color: 'black', fontWeight: '500' }

});