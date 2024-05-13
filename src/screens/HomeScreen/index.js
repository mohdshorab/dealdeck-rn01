import React, { useState, useEffect } from "react";
import {
    SafeAreaView, Text, View, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Platform
} from "react-native";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";
import CustomSearchBar from "../../components/SearchBar/searchBar";
import Carousel from "../../components/ImageCarousel";
import { carouselJson } from "../../constants/carouselJson";
import { CategoryImages } from "../../constants/categoriesImage";
import { observer } from "mobx-react";
import { MasonryTiles } from "../../components/Mansory/masonryTiles";


const HomeScreen = observer(({ navigation }) => {
    const { auth, products } = useStore();

    useEffect(() => {
        products.loadProductsCategories()
        products.loadRandomProducts()
        console.log(products.randomProduct);
    }, [])

    const categoryWithImages = products.productCategories.map(categoryName => ({
        name: categoryName,
        image: CategoryImages[categoryName],
    }));

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader title={'DealDeck'} />
            <ScrollView >
                <CustomSearchBar />
                <Carousel images={carouselJson.images} />
                <Text style={{ fontSize: 30, marginLeft: 10, marginBottom: 10, marginTop: 20 }} >Collections  </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        categoryWithImages.map((item) => {
                            const formattedName = item.name.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
                            return (
                                <TouchableOpacity
                                    key={item.name}
                                    style={styles.itemContainer}
                                >
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                    </View>
                                    <Text style={styles.name}>{formattedName}</Text>
                                </TouchableOpacity>
                            )
                        })}
                </ScrollView>
                <View style={{ backgroundColor: '#ADD8E6', flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '100%', paddingTop: 5 }} >
                    <Text style={{ fontSize: 25, marginLeft: 10, }} >New In</Text>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 500, color: 'grey', marginRight: 25 }} >See All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.NewItemsList}>
                    {products.randomProduct.map((item, index) => {
                        // Check if the current index is divisible by 2 to create pairs
                        if (index % 2 === 0) {
                            const nextItem = products.randomProduct[index + 1]; // Get the next item in the array
                            return (
                                <View style={styles.rowContainer} key={item.id}>
                                    <MasonryTiles product={item} />
                                    {nextItem && <MasonryTiles product={nextItem} index={index} />}
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    userName: {
        fontSize: 15,
        fontWeight: '700'
    },
    hiText: {
        fontSize: 20,
        color: 'black'
    },
    NewItemsList: {
        padding: 10,
        backgroundColor: '#ADD8E6'
    },
    itemContainer: {
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 15
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        marginTop: 5,
        textAlign: 'center',
    },
    usernameView: {
        // flex:1,
        flexDirection: "row",
        marginLeft: 10,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderRadius: 20,
        padding: 5,
        borderColor: '#00C0FF',
        alignItems: "center"
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Adjust the spacing between rows if needed
    },


})

export default HomeScreen;