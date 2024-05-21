import { observer } from "mobx-react";
import React, { useEffect } from "react";
import {
    SafeAreaView, Text, View, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Platform, RefreshControl, ActivityIndicator
} from "react-native";
import CustomHeader from "../../components/Header";

const Category = observer(() => {

    useEffect(() => {
    }, [])

    return (
        <SafeAreaView style={styles.container} >
            <CustomHeader title={'DealDeck'} FullHeader />
        </SafeAreaView>
    )

})

export default Category;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
})