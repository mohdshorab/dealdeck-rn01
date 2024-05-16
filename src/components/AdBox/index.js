import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AdBox = ({ product }) => {
    const { title, price, images } = product;
    const firstImageUrl = images[0];

    return (
        <>
            <Text>SPONSORED</Text>
            <View style={styles.container}>
                <Image source={{ uri: firstImageUrl }} style={styles.image} />
                <View style={{flexDirection:'column', marginLeft:'5%', }} >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price}</Text>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // borderWidth: 1,
        // borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    priceContainer: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginBottom: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        width: '25%',
        height: 200,
        resizeMode: 'contain',
    },
});

export default AdBox;