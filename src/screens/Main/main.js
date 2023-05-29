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
import { FlatGrid, SimpleGrid } from "react-native-super-grid";
import { MasonryTiles } from "../../components/Mansory/masonryTiles";


const Main = observer(({ navigation }) => {
    const { auth, products } = useStore();

    useEffect(() => {
        products.loadProductsCategories()
        products.loadRandomProducts()
        console.log(products.randomProduct);
    }, [])

    const collectionTiles = ({ item }) => {
        console.log('item', item)
        const formattedName = item.name.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
        return (
            <TouchableOpacity style={styles.itemContainer} >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <Text style={styles.name} >{formattedName}</Text>
            </TouchableOpacity>
        )
    }

    const categoryWithImages = products.productCategories.map(categoryName => ({
        name: categoryName,
        image: CategoryImages[categoryName],
    }));

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader title={'DealDeck'} />
            <ScrollView>
                <CustomSearchBar />
                <Carousel images={carouselJson.images} />
                <Text style={{ fontSize: 30, marginLeft: 10, marginBottom: 10, marginTop: 20 }} >Collections  </Text>
                <FlatList
                    data={categoryWithImages}
                    renderItem={collectionTiles}
                    // keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
                {/* <View style={styles.usernameView} >
                    <Image source={{ uri: auth?.profileData.data.avatar }} style={{ marginRight: 10, resizeMode: "cover", height: 35, width: 35, borderRadius: 50, }} />
                    <View style={{ flexDirection: "column" }} >
                        <Text style={styles.userName} >Hi, {auth?.profileData.username}</Text>
                        <Text>Discover your next style.</Text>
                    </View>
                </View> */}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '90%' }} >
                    <Text style={{ fontSize: 27, marginLeft: 10, }} >New In  </Text>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: 500, color: 'grey' }} >See All</Text>
                    </TouchableOpacity>
                </View>
                {
                    products?.randomProduct && products.randomProduct.length > 0 ?
                        <View View style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            // alignSelf: 'center',
                            margin: 2
                        }} >
                            <SimpleGrid
                                itemDimension={130}
                                data={products.randomProduct}
                                renderItem={({ item }) => (<MasonryTiles product={item} />)}
                            />
                        </View>
                        : <View></View>
                }
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
    flatlistContainer: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        marginBottom:15
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
    }

})

export default Main;