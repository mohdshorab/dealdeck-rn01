import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from "../../store";
import CustomHeader from "../../components/Header";
import CustomButton from "../../components/Button";

export const CartScreen = observer(({ navigation }) => {
    const { cart, auth } = useStore();

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.priceText}>${item.price}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={() => cart.decreaseItemCount(item, auth.profileData)}
                    style={styles.quantityButton}
                >
                    <Icon name="remove" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.noOfItems}</Text>
                {item.noOfItems < 3 ?
                    <TouchableOpacity
                        onPress={() => cart.increaseItemCount(item, auth.profileData)}
                        style={styles.quantityButton}
                    >
                        <Icon name="add" size={24} color="#333" />
                    </TouchableOpacity>
                    : null

                }
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader navigation={navigation} titleOnHead={'Your Cart'} titleStyle={styles.headerTitle} />
            {cart.cartCount > 0 ? (
                <FlatList
                    data={cart.cartItems}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Image source={require('../../assets/images/emptyCart.png')} style={styles.emptyCartImage} />
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <Text style={styles.emptyCartSubText}>Add items to get started</Text>
                </View>
            )}
            {cart.cartCount > 0 && (
                <View style={styles.totalContainer}>
                    <View style={styles.subTotalContainer} >
                        <Text style={styles.totalText}>Total: ${cart.totalAmount.toFixed(2)}</Text>
                        <Text style={styles.itemCount}>({cart.cartCount} items)</Text>
                    </View>
                    <CustomButton title={'Place Order'} textStyle={{ fontWeight: 'bold', fontSize: 18 }} />
                </View>
            )}
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemCount: {
        fontSize: 16,
        color: '#666',
    },
    listContainer: {
        paddingVertical: 8,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
    },
    brandText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    titleText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 4,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 8,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
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
    totalContainer: {
        flexDirection: "column",
        backgroundColor: '#fff',
        padding: 16,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subTotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8

    }
});
