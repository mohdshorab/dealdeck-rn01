import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import StarRating from 'react-native-star-rating';
import CustomHeader from "../../components/Header";
import Swiper from "react-native-swiper";
import CustomButton from "../../components/Button";
import Carousel from "../../components/ImageCarousel";
import { useStore } from "../../store";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library you're using
import { observer } from "mobx-react";

const ProductDetail = observer(({ route, navigation }) => {
    const { products } = useStore();
    const { productData } = route.params;
    const [similarProducts, setSimilarProducts] = useState([]);
    const [showLoader, setLoader] = useState(false);
    const emi = (productData.price / 6).toFixed(2);

    useEffect(() => {
        getSimilarProduct();
        console.log('PRODUCT', similarProducts)
    }, [])

    const getSimilarProduct = async () => {
        setLoader(true);
        const res = await products.loadProductsOfCategory(productData.category);
        console.log('RES', res);
        setSimilarProducts(res);
        setLoader(false);
    }

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader canGoBack />
            {showLoader && <ActivityIndicator />}
            <ScrollView>
                <Carousel images={productData.images} showsPagination height={200} showsButtons={true} />
                <View style={{ marginTop: '10%', width: '95%', alignSelf: 'center' }} >
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'grey' }} >More products from </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'black' }} >{productData.brand}</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 25 }} >{productData.title}</Text>
                    <View style={{ width: 55, flex: 1, flexDirection: 'row', marginTop: 2 }} >
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={productData.rating}
                            starSize={16}
                            fullStarColor={'green'}
                        />
                        <Text> . </Text>
                        <Text style={{ color: 'green' }} >{productData.rating} </Text>
                    </View>
                    <View style={{ padding: 5, flex: 1, flexDirection: 'row', marginTop: 25, alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }} >$ {productData.price} </Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} >
                            <Text style={{ fontSize: 15 }} >EMI starts from</Text>
                            <Text style={{ fontSize: 15, marginRight: 15 }} > ${emi}</Text>
                            <TouchableOpacity style={{ height: 20, width: 20, alignItems: 'center', borderRadius: 10, borderWidth: 1, paddingTop: 3 }} >
                                <Icon name="info" size={12} color="green" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 17 }}>{productData.description}</Text>
                    <View style={{ borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 }} />


                    {/* SIMILAR PRODUCTS */}
                    <TouchableOpacity onPress={() => { }} >
                        <Text style={{ fontSize: 15, marginBottom: 10, fontWeight: '900', color: '#01BFFF' }} >Similar Products</Text>
                    </TouchableOpacity>
                    <ScrollView style={{ flex: 1, flexDirection: "row", }} horizontal showsHorizontalScrollIndicator={false} >
                        {similarProducts.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Products', { productData: item })
                                }}
                                    style={{ marginRight: 10, width: 130, borderWidth: 1, borderColor: 'grey', alignItems: 'center', padding: 5 }} >
                                    <Image source={{ uri: item.thumbnail }} style={{ height: 140, width: 110, borderRadius: 10, resizeMode: 'cover' }} />
                                    <Text style={{ fontSize: 15, marginTop: 5, }} >{item.brand}</Text>
                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
                                    <Text style={{ color: 'black', fontWeight: '800' }} >$ {item.price} </Text>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }} >
                                        <StarRating
                                            disabled={true}
                                            rating={item.rating}
                                            starSize={12}
                                            fullStarColor={'green'}
                                            maxStars={5}
                                            emptyStarColor={'grey'} // Color of the empty star
                                        />
                                        {/* <Text style={{ color: 'green', marginLeft:10 }} >{productData.rating} </Text> */}
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <View style={{ borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 }} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 0 }} >
                        <View style={styles.option}>
                            <Icon name="undo" size={25} color="blue" style={styles.icon} />
                            <Text style={styles.optionText}>10 days return</Text>
                        </View>
                        <View style={styles.option}>
                            <Icon name="money" size={25} color="darkgreen" style={styles.icon} />
                            <Text style={styles.optionText}>Cash on delivery</Text>
                        </View>
                        <View style={styles.option}>
                            <Icon name="star" size={25} color="blue" style={styles.icon} />
                            <Text style={styles.optionText}>Premium Deck</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 }} />

                </View>
            </ScrollView>
            <View style={{ marginVertical: 15, shadowOpacity: 1, height: 20 }} />
            <View style={{ flex: 1, flexDirection: "row", position: "absolute", bottom: 0, width: '100%' }}>
                <TouchableOpacity style={[styles.button, styles.blueButton]}>
                    <Text style={styles.buttonText}>Add to cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.redButton]}>
                    <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
});

export default ProductDetail;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    FixedBtn: {
        // alignContent: 'center',
        // flex: 1,
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust as needed
        // position: 'absolute',
        // bottom: 0, // Adjust as needed
        // left: 0,
        // right: 0,
    },
    button: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    blueButton: {
        backgroundColor: 'blue',
    },
    redButton: {
        backgroundColor: 'red',
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    option: {
        width: 90,
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    optionText: {
        fontSize: 15,
        textAlign: "center"

    },
})