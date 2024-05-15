import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Button } from "react-native";
import StarRating from 'react-native-star-rating';
import CustomHeader from "../../components/Header";
import Carousel from "../../components/ImageCarousel";
import { useStore } from "../../store";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library you're using
import { observer } from "mobx-react";

const ProductDetail = observer(({ route, navigation }) => {
    const { products } = useStore();
    const { productData } = route.params;
    const [similarProducts, setSimilarProducts] = useState([]);
    const [pincode, setPincode] = useState('');
    const [refreshing, setRefreshing] = useState(false); // Define the refreshing state

    const [showLoader, setLoader] = useState(false);
    const emi = (productData.price / 6).toFixed(2);

    useEffect(() => {
        getSimilarProduct();
        products.loadRandomProducts()
    }, [])

    const getSimilarProduct = async () => {
        setLoader(true);
        const res = await products.loadProductsOfCategory(productData.category);
        const filteredSimilarProducts = res.filter(
            (product) => product.id !== productData.id
        );
        setSimilarProducts(filteredSimilarProducts);
        setLoader(false);
    }

    const handleRefresh = () => {
        setLoader(true);
        setRefreshing(true); // Set refreshing to true
        // Call your refresh functions here
        getSimilarProduct();
        products.loadRandomProducts()
        setRefreshing(false); // Set refreshing to false after the refresh is complete
        setLoader(false);
    };

    const handlePincodeChange = (text) => {
        // Remove non-numeric characters from the input
        const numericText = text.replace(/[^0-9]/g, '');

        // Limit the input to 6 digits
        if (numericText.length <= 6) {
            setPincode(numericText);
        }
    };

    const handleCheckDelivery = () => {
        // Assuming you have an API endpoint to check delivery availability
        const isDeliverable = checkDeliveryAvailability(pincode);

        if (isDeliverable) {
            Alert.alert('Success', 'Product is deliverable to your pincode.');
        } else {
            Alert.alert('Error', 'Sorry, product cannot be delivered to your pincode.');
        }
    };

    // Dummy function to simulate checking delivery availability
    const checkDeliveryAvailability = (pincode) => {
        // Replace this with your actual logic to check delivery availability
        return pincode === '123456';
    };


    if (showLoader) {
        return (
            <SafeAreaView>
                <CustomHeader canGoBack />
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader canGoBack />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} title="Release to refresh" />
                }
            >
                <Carousel images={productData.images} showsPagination height={200} showsButtons={true} />
                <View style={styles.subContainer} >
                    <View style={styles.brandView} >
                        <Text style={styles.moreProductText} >More products from </Text>
                        <TouchableOpacity>
                            <Text style={styles.BrandNameText} >{productData.brand}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.productTitle} >{productData.title}</Text>
                    <View style={styles.starRatingView} >
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={productData.rating}
                            starSize={16}
                            fullStarColor={'green'}
                        />
                        <Text> . </Text>
                        <Text style={styles.ratingText} >{productData.rating} </Text>
                    </View>
                    <View style={styles.priceView}>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
                                <Icon name="long-arrow-down" size={15} color="green" />
                                <Text style={styles.discountPercentage}  >{productData.discountPercentage.toFixed(0)}% </Text>
                                <Text style={styles.mrpText} >$ {productData.price} </Text>
                                <Text style={styles.priceText} >${(productData.price - (productData.price * (productData.discountPercentage.toFixed(0) / 100))).toFixed(0)} </Text>

                            </View>
                        </View>
                        <View style={styles.emiView} >
                            <Text style={styles.emiText} >EMI starts from</Text>
                            <Text style={styles.emiText} > ${emi}   </Text>
                            <TouchableOpacity style={styles.infoButton} >
                                <Icon name="info" size={12} color="green" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.descriptionText}>{productData.description}</Text>
                    <View style={[styles.straightLine, { borderBottomColor: 'black', }]} />
                    <Text style={{ fontWeight: '600',  }} >Check the product availability at your pincode.</Text>
                    <View style={{ flex: 1, flexDirection: "row", marginTop: 15,alignSelf:'center'  }} >
                        <TextInput
                            style={{ width: 200, height: 40, borderWidth: 1, borderColor: 'gray', paddingHorizontal: 10 }}
                            keyboardType="numeric"
                            maxLength={6}
                            value={pincode}
                            onChangeText={handlePincodeChange}
                            placeholder="Enter Pincode"
                        />
                        <TouchableOpacity
                            style={[styles.pincodeBtn, pincode.length !== 6 && styles.buttonDisabled]}
                            onPress={handleCheckDelivery}
                            disabled={pincode.length !== 6}
                        >
                            <Text style={styles.checkDeliveryBtn}>Check Delivery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.straightLine} />


                    <View style={styles.optionContainer} >
                        {productData.category !== 'smartphones' || "laptops" || "furniture" ?
                            <View style={styles.option}>
                                <Icon name="undo" size={25} color="blue" style={styles.icon} />
                                <Text style={styles.optionText}>10 days return</Text>
                            </View>
                            :
                            <View style={styles.option}>
                                <Icon name="truck" size={25} color="black" style={styles.icon} />
                                <Text style={styles.optionText}>7 days service center replacement</Text>
                            </View>
                        }
                        <View style={styles.option}>
                            <Icon name="money" size={25} color="darkgreen" style={styles.icon} />
                            <Text style={styles.optionText}>Cash on delivery</Text>
                        </View>
                        <View style={styles.option}>
                            <Icon name="star" size={25} color="blue" style={styles.icon} />
                            <Text style={styles.optionText}>Premium Sure</Text>
                        </View>
                    </View>
                    <View style={{ borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 }} />

                    {productData.category !== 'smartphones' || "laptops" || "furniture" ?
                        <Text style={{ alignSelf: "center" }} >1 Year Manufacturing Warranty Know More</Text> : null
                    }
                    <View style={{ borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 }} />

                    {/* SIMILAR PRODUCTS */}
                    <TouchableOpacity onPress={() => { }} >
                        <Text style={styles.similarProductsText} >Similar Products</Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.similarProductsContainer} horizontal showsHorizontalScrollIndicator={false} >
                        {similarProducts.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.push('Products', { productData: item })
                                }}
                                    style={{ marginRight: 10, width: 130, borderWidth: 1, borderColor: 'grey', padding: 5 }} >
                                    <Image source={{ uri: item.thumbnail }} style={styles.similarProductImage} />
                                    <Text style={styles.similarProductBrand} >{item.brand}</Text>
                                    <Text style={styles.similarProductTitle}>{item.title}</Text>
                                    <View style={styles.similarProductRatingView} >
                                        <Text style={styles.similarProductPrice} >${item.price} </Text>
                                        <StarRating
                                            disabled={true}
                                            rating={item.rating}
                                            starSize={12}
                                            fullStarColor={'green'}
                                            maxStars={5}
                                            emptyStarColor={'grey'} // Color of the empty star
                                        />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <View style={styles.straightLine} />



                    {/* Products You may like */}
                    <TouchableOpacity onPress={() => { }} >
                        <Text style={styles.similarProductsText} >Products you may like</Text>
                    </TouchableOpacity>
                    <ScrollView style={styles.similarProductsContainer} horizontal showsHorizontalScrollIndicator={false} >
                        {products.randomProduct.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigation.push('Products', { productData: item })
                                }}
                                    style={{ marginRight: 10, width: 130, borderWidth: 1, borderColor: 'grey', alignItems: 'center', padding: 5 }} >
                                    <Image source={{ uri: item.thumbnail }} style={styles.similarProductImage} />
                                    <Text style={styles.similarProductBrand} >{item.brand}</Text>
                                    <Text style={styles.similarProductTitle}>{item.title}</Text>
                                    <Text style={styles.similarProductPrice} >$ {item.price} </Text>
                                    <View style={styles.similarProductRatingView} >
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



                </View>
            </ScrollView>
            <View style={styles.bottomSpacer} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.yellowButton]}>
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
        // borderRadius:10,
    },
    yellowButton: {
        backgroundColor: '#FF8204',
    },
    redButton: {
        backgroundColor: 'green',
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    option: {
        width: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    },
    icon: {
        marginRight: 5,
    },
    optionText: {
        fontSize: 12,
        textAlign: "center"

    },
    subContainer: { marginTop: '10%', width: '95%', alignSelf: 'center' },
    brandView: { flex: 1, flexDirection: 'row' },
    moreProductText: { fontWeight: 'bold', fontSize: 15, color: 'grey' },
    BrandNameText: { fontWeight: 'bold', fontSize: 15, color: 'black' },
    productTitle: { fontWeight: 'bold', fontSize: 25 },
    starRatingView: { width: 55, flex: 1, flexDirection: 'row', marginTop: 2 },
    straightLine: { borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 },
    bottomSpacer: { marginVertical: 15, shadowOpacity: 1, height: 20 },
    similarProductBrand: { fontSize: 13, marginTop: 5 },
    similarProductTitle: { fontSize: 13, fontWeight: '500' },
    similarProductPrice: { color: 'black', fontWeight: '800' },
    similarProductRatingView: { flex: 1, flexDirection: "row", alignItems: 'center', alignContent: 'space-between' },
    separatorLine: { borderWidth: 0.5, borderBottomColor: 'grey', marginVertical: 15, shadowOpacity: 1 },
    similarProductsText: { fontSize: 15, marginBottom: 10, fontWeight: '900', color: '#01BFFF' },
    descriptionText: { marginTop: 10, fontSize: 15, color: '#7c7c7c', fontWeight: 'bold' },
    emiText: { fontSize: 15, },
    priceText: { fontWeight: 'bold', fontSize: 18 },
    ratingText: { color: 'green' },
    priceView: { padding: 5, flex: 1, flexDirection: 'row', marginTop: 15, alignItems: 'center' },
    emiView: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
    infoButton: { height: 20, width: 20, alignItems: 'center', borderRadius: 10, borderWidth: 1, paddingTop: 3 },
    similarProductsContainer: { flex: 1, flexDirection: "row", },
    similarProductImage: { height: 140, width: 110, borderRadius: 10, resizeMode: 'cover' },
    optionContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 0 },
    buttonContainer: { flex: 1, flexDirection: "row", position: "absolute", bottom: 0, width: '100%', alignContent: "space-between" },
    discountPercentage: { fontWeight: '500', fontSize: 15, },
    mrpText: { fontWeight: '500', fontSize: 15, textDecorationLine: 'line-through' },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    pincodeBtn: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#999999',
    },
    checkDeliveryBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }

})