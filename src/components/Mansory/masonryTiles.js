import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, Platform, View } from "react-native";
export const MasonryTiles = ({ product }) => {
  const formattedTitle = product.title.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{ uri: product.thumbnail }} style={styles.itemImage} />
      <Text style={styles.itemTitle}>{formattedTitle}</Text>
      <View style={{ flexDirection: "row" }} >
        <Text style={{ fontWeight: 500, color: 'green', fontSize: 15 }} >{product.discountPercentage}% off </Text>
        <Text style={{fontWeight:'bold', color:'grey'}} >{product.price} </Text>
        </View>
        <Text style={{ fontWeight: 'bold', color: 'green' }} > ${discountedPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  itemImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    // paddingHorizontal: 10,
    alignSelf: 'center',
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  randomProductContainer: {
    flex: 1,
    // alignItems: 'center',
    margin: 10,
    width: '100%',
    ...Platform.select({
      android: {
        elevation: 3,

      },
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
    }),
  },



    exactPricecontainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginRight: 10,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: 'black',
    },
  
});
