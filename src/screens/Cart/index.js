import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from "../../store";
import CustomHeader from "../../components/Header";
import CustomButton from "../../components/Button";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SkeletonLoader } from "../../components/Shimmer";

export const CartScreen = observer(({ navigation }) => {
    const { cart, auth } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [skeLoader, setSkeLoader] = useState(true);

    useEffect(() => {
        cart.fetchCartItem(auth.profileData)
        cart.cartCount > 0 && setTimeout(() => {
            setSkeLoader(false)
        }, 1500);
    }, [])


    const handleOnPress = () => {
        if (Object.keys(auth.profileData).length === 0) {
            setShowModal(true);
        }
    }

    const renderItem = ({ item }) => (
        <>
            {skeLoader ?
                <SkeletonLoader
                    height={100}
                    row={5}
                    type={'rectangle'}
                /> :
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => navigation.push('ProductDetail', { productData: item })}
                >
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
                </TouchableOpacity>
            }
        </>
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
                <>
                    <View style={styles.totalContainer}>
                        {
                            skeLoader ?
                                <SkeletonLoader
                                    shimmerWidth={190}
                                    height={20}
                                />
                                :

                                <Text style={styles.totalText}>Total: ${cart.totalAmount.toFixed(2)}</Text>
                        }
                        {skeLoader ? <SkeletonLoader
                            height={40}
                        />
                            :
                            <CustomButton
                                onPress={() => handleOnPress()}
                                title={'Place Order'}
                                textStyle={{ fontWeight: 'bold', fontSize: 18, paddingVertical: 5 }}
                            />
                        }
                    </View>
                </>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>To Proceed to checkout please login.</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <TouchableOpacity
                                style={{ padding: 10, alignItems: 'center' }}
                                onPress={() => navigation.navigate('logInForm')}>
                                <MaterialIcons
                                    name="login"
                                    size={46}
                                    color='#4285F4'
                                />
                                <Text style={{ fontWeight: 700, fontSize: 14, paddingTop: 5, color: '#666' }} >Log in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 10, alignItems: 'center' }}
                                onPress={() => navigation.navigate('logInForm')}>
                                <Image
                                    source={require('../../assets/images/GooglePNG.png')}
                                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                                />
                                <Text style={{ fontWeight: 700, fontSize: 14, paddingTop: 5, color: '#666' }} >Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 10, alignItems: 'center', }}
                                onPress={() => navigation.navigate('logInForm')}>
                                <Image
                                    source={require('../../assets/images/PhonePNG.png')}
                                    style={{ height: 50, width: 50, resizeMode: 'contain' }}
                                />
                                <Text style={{ fontWeight: 700, fontSize: 14, paddingTop: 5, color: '#666' }} >Phone</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{
                            position: 'absolute', top: 10, right: 10
                        }}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={{ fontWeight: 700, fontSize: 14, paddingTop: 5, color: '#666' }} >Skip & Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
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
        backgroundColor: 'white'
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
        paddingBottom: 25
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingVertical: 20
    },
    loginButton: {
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 8,
        width: '100%',
        maxWidth: 500,
        elevation: 5,
        position: 'relative',
        alignContent: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 24,
        textAlign: 'center',
        paddingTop: 15,
        color: 'black'
    },
    modalButton: {
        padding: 10, backgroundColor: '#2196F3', borderRadius: 10
    },
    modalButtonText: {
        color: 'white', fontWeight: '700'
    }
});