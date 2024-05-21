import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import CustomHeader from '../../components/Header';
import { categoriesName } from '../../constants/dummyJSONs';
import { CategoryImages } from '../../constants/categoriesImage';

const Category = observer(({navigation}) => {
    useEffect(() => { }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=> navigation.navigate('ProductsOfCategory',{category:item})} style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.charAt(0).toUpperCase()+item.slice(1)}</Text>
            <Image source={{ uri: CategoryImages[item] }} style={styles.categoryImage} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title={'DealDeck'} FullHeader />
            <FlatList
                data={categoriesName}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
});

export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height:120,
        marginVertical:10,
        borderRadius: 20,
        width:'95%',
        marginHorizontal:10,
        backgroundColor: 'white'

    },
    categoryImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right:0,
        borderWidth:1,
        width:'50%',
        borderTopRightRadius: 20,
        borderBottomRightRadius:20
    },
    categoryText: {
        paddingLeft:10,
        fontWeight:'500',
        width: '50%',
        fontSize: 20,
        color: 'black'
    },
});
