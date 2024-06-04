import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/Header";
import CustomButton from "../../components/Button";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { useStore } from "../../store";


export const CartScreen = observer(({ navigation }) => {
    const { cart } = useStore();

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { }} style={styles.categoryContainer}>
            <View style={{ justifyContent: 'flex-start' }}>
                <Image source={{ uri: item.thumbnail }} style={styles.categoryImage} />
            </View>
            <View>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.titleText}>{item.title.split(' ').slice(0, 3).join(' ')}</Text>
                <Text style={styles.priceText}>{item.price}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} >
                <AntDesignIcon name='minuscircle' size={20} color='red' />
                <Text style={styles.item}>{item.noOfItems}</Text>
                <AntDesignIcon name='pluscircle' size={20} color='green' />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <CustomHeader titleOnHead={'Your Cart'} navigation={navigation} />
            {(cart?.cartItems?.length) ?
                <FlatList
                    data={cart.cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                /> :
                <SafeAreaView style={styles.emptyCart}>
                    <Image source={require('../../assets/images/emptyCart.png')} style={styles.emptyCartImage} />
                    <Text style={styles.emptyCartText}>Cart is empty!</Text>
                    <Text style={styles.emptyCartSubText}>Please add your favourite items in cart</Text>
                    <CustomButton
                        title={'Add Items'}
                        buttonStyle={{ padding: 10, backgroundColor: '#37A0FC', }}
                        textStyle={{ fontSize: 20 }}
                        onPress={() => { navigation.navigate('FavProds') }}
                    />
                </SafeAreaView>
            }
        </SafeAreaView>
    )

}
)

const styles = StyleSheet.create({
    emptyCart: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    emptyCartImage: {
        height: 300,
        width: 300,
        resizeMode: "contain"
    },
    emptyCartText: {
        fontSize: 40,
        color: '#4a4b4d',
        fontWeight: '400'
    },
    emptyCartSubText: {
        marginVertical: 25,
        fontSize: 20,
        color: '#4a4b4d',
        fontWeight: '300'
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        marginVertical: 10,
        borderRadius: 20,
        width: '95%',
        marginHorizontal: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    categoryImage: {
        width: 120,
        height: 120,
        borderRadius: 120,
    },
    brandText: {
        fontWeight: '500',
        fontSize: 18,
        color: '#4a4b4d'
    },
    titleText: {
        fontWeight: '700',
        fontSize: 20,
        color: '#4a4b4d'
    },
    priceText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#4a4b4d'
    },
    item: {
        fontSize: 23,
        marginHorizontal: 10
    }

})