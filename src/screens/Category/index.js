import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import CustomHeader from '../../components/Header';
import { categoriesName } from '../../constants/dummyJSONs';
import { CategoryImages } from '../../constants/categoriesImage';
import { SkeletonLoader } from '../../components/Shimmer';

const Category = observer(({ navigation }) => {

    const [skeLoader, setSkeLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSkeLoader(false)
        }, 1000);
    }, [])


    const renderItem = ({ item }) => (
        <>
            {skeLoader ? <SkeletonLoader
                height={100}
                shimmerWidth={'100%'}
            /> :
                <TouchableOpacity onPress={() => navigation.navigate('ProductsOfCategory', { category: item })} style={styles.categoryContainer}>
                    <Text style={styles.categoryText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                    <Image source={{ uri: CategoryImages[item] }} style={styles.categoryImage} />
                </TouchableOpacity>
            }
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader titleOnHead={'Category'} navigation={navigation} />
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
        height: 100,
        marginVertical: 10,
        borderRadius: 20,
        width: '95%',
        marginHorizontal: 10,
        backgroundColor: 'white',
        ...Platform.select({
            android: {
                elevation: 10,
            },
        }),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
        }),

    },
    categoryImage: {
        width: 100,
        height: 100,
        // position: 'absolute',
        // right:0,
        // borderWidth:1,
        width: '50%',
        borderRadius: 20
    },
    categoryText: {
        paddingLeft: 10,
        fontWeight: '500',
        width: '50%',
        fontSize: 20,
        color: 'black'
    },
});
