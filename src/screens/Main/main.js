import React, { useState, useEffect } from "react";
import {
    SafeAreaView, Text, View, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity
} from "react-native";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";
import CustomSearchBar from "../../components/SearchBar/searchBar";
import Carousel from "../../components/ImageCarousel";
import { carouselJson } from "../../constants/carouselJson";
import { CategoryImages } from "../../constants/categoriesImage";


const Main = ({ navigation }) => {
    const { auth, products } = useStore();

    // const horizontalCollections = ({item =[]}) => {
    //     <View style={styles.itemContainer}>
    //         {/* <View style={styles.imageContainer}>
    //             <Image source={{ uri: item.image }} style={styles.image} />
    //         </View> */}
    //         <Text style={styles.name}>{item}</Text>
    //     </View>
    // }

    useEffect(() => {
        products.loadProductsCategories()
        console.log(products.productCategories);
    }, [])

    const categoryWithImages = products.productCategories.map(categoryName => ({

        name: categoryName,
        image: CategoryImages[categoryName],
    }));

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader title={'DealDeck'} />
            <ScrollView>
                <CustomSearchBar />
                <Text style={styles.userName} >Hi, {auth?.profileData.userName}</Text>
                <Carousel images={carouselJson.images} />
                <Text style={{ fontSize: 30, marginLeft: 10, marginBottom:10 }} >Collections  </Text>
                <FlatList
                    data={categoryWithImages}
                    renderItem={({ item }) => {
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
                    }
                    // keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                />
                <View style={{flexDirection: "row", marginTop:30, alignItems:"center", justifyContent: "space-between", width:'90%'}} >
                <Text style={{ fontSize: 27, marginLeft: 10, }} >New In  </Text>
                <TouchableOpacity>
                    <Text style={{fontWeight:500, color:'grey' }} >See All</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    userName: {
        margin: 10
    },
    flatlistContainer: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
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



})

export default Main;