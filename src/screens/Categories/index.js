import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useStore } from "../../store";
import { observer } from "mobx-react";
import CustomHeader from "../../components/Header";
import { MasonryTiles } from "../../components/Mansory/masonryTiles";
import SaleBanner from "../../components/SaleBanner";
import { categoriesName, imageUrls } from "../../constants/dummyJSONs";

const Categories = observer(({ route, navigation }) => {
    const { category } = route.params;
    const { products } = useStore();
    const [productsOfCat, setProductsOfCat] = useState([]);


    useEffect(() => {
        console.log('params', route.params, productsOfCat);
        getTheProducts();
    }, [])

    const getTheProducts = async () => {
        const res = await products.loadProductsOfCategory(category);
        res.length > 0 ? setProductsOfCat(res) : null;
    }

    const CategoryImage = () => {
        const imageSrc = imageUrls[category] || imageUrls.default;

        return <Image source={{ uri: imageSrc }} style={styles.stateicImageBanner} />;
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }} >
            <CustomHeader title={category.charAt(0).toUpperCase() + category.slice(1)} canGoBack />
            <ScrollView style={{ backgroundColor: 'white', marginTop: 10 }} >
                <CategoryImage />
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ backgroundColor: 'white' }} >
                    {
                        productsOfCat.length > 0 && productsOfCat.map((item) => {
                            const discountedPrice = item.price - (item.price * item.discountPercentage / 100);
                            const formattedName = item.title.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
                            return (
                                <TouchableOpacity
                                    key={item.name}
                                    style={styles.itemContainer}
                                    onPress={() => {
                                        // navigation.navigate('productDetails', { category: item.name })
                                    }}
                                >
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: item.images[1] }} style={styles.image} />
                                    </View>
                                    <Text style={styles.name}>{formattedName}</Text>
                                    <Text style={styles.discountedPrice}>From ${discountedPrice.toFixed(0)}</Text>
                                </TouchableOpacity>
                            )
                        })}
                </ScrollView>
                <SaleBanner
                    saleText={'Laptop Sale'}
                    sloganText={'Unleash Your Productivity, Anywhere'}
                    discountText={'Up to 50% OFF'}
                    bgImage={require('../../assets/images/black-bg.jpg')}
                    floatingImage1={require('../../assets/images/legion_nobg.png')}
                    floatingImage2={require('../../assets/images/ROG_NOBG.png')}
                />
                <View style={styles.NewItemsList}>
                    {productsOfCat.map((item, index) => {
                        if (index % 2 === 0) {
                            const nextItem1 = productsOfCat[index + 1];
                            return (
                                <View style={styles.rowContainer} key={item.id}>
                                    <MasonryTiles product={item} navigation={navigation} />
                                    {nextItem1 && <MasonryTiles product={nextItem1} index={index} navigation={navigation} />}
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
        // <Text>{productsOfCat[0].brand}ss</Text>
    )
});

const styles = StyleSheet.create({
    NewItemsList: {
        padding: 10,
        paddingTop: 3
        // backgroundColor: '#ADD8E6'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Adjust the spacing between rows if needed
    },
    itemContainer: {
        padding: 5,
        alignItems: 'center',

        marginLeft: 10
    },
    imageContainer: {
        width: 70,
        height: 100,
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        marginTop: 2,
        textAlign: 'center',
    },
    discountedPrice: {
        color: 'green',
        fontWeight: '700'
    },
    stateicImageBanner: {
        height: 160,
        width: '100%',
        resizeMode: 'cover',
        marginBottom: 10
    }

})


export default Categories;