import React, { useState, useEffect } from "react";
import {
    SafeAreaView, Text, View
} from "react-native";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";
import CustomSearchBar from "../../components/SearchBar/searchBar";

const Main = ({ navigation }) => {
    const { auth,products } = useStore();

    const JSON = {
        "images": [
            {
                "id": "1",
                "url": "https://example.com/image1.jpg",
                "title": "Image 1",
                "description": "Description for Image 1"
            },
            {
                "id": "2",
                "url": "https://example.com/image2.jpg",
                "title": "Image 2",
                "description": "Description for Image 2"
            },
            {
                "id": "3",
                "url": "https://example.com/image3.jpg",
                "title": "Image 3",
                "description": "Description for Image 3"
            },
            {
                "id": "4",
                "url": "https://example.com/image4.jpg",
                "title": "Image 4",
                "description": "Description for Image 4"
            },
            {
                "id": "5",
                "url": "https://example.com/image5.jpg",
                "title": "Image 5",
                "description": "Description for Image 5"
            }
        ]
    }
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
            <CustomHeader title={'DealDeck'} />
            <CustomSearchBar />
            <View>
                <Text>Hi, {auth?.profileData.userName}</Text>
            </View>
        </SafeAreaView>
    )

}

export default Main;