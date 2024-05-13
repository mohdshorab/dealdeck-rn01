import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, Platform, View } from "react-native";
import StarRating from 'react-native-star-rating';



export const MasonryTiles = ({ product, index }) => {
  const formattedTitle = product.title.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const notEvenIndex = index % 2 !== 0;

  return (
    <TouchableOpacity style={[styles.itemContainer, notEvenIndex && styles.evenItemContainer]}>
      <Image source={{ uri: product.thumbnail }} style={styles.itemImage} />
      <Text style={styles.itemTitle} adjustsFontSizeToFit numberOfLines={1} >{formattedTitle}</Text>
      <View style={styles.productDetailsView} >
        <Text style={styles.discountPercentage} >{product.discountPercentage}% off</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={product.rating}
          starSize={13}
          fullStarColor={'green'}
        />
      </View>
      <View style={styles.productDetailsView} >
        <Text style={styles.productPrice} >${product.price}</Text>
        <Text style={styles.discountedPrice} >${discountedPrice.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: '50%',
    padding: 10,
    backgroundColor: "#fff",
  },
  evenItemContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    width: '50%',
    padding: 10,
    backgroundColor: "#fff",
    marginRight: 10, // Add margin only if the index is even
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius:10
  },
  itemTitle: {
    fontSize: 14,
    // fontWeight: 'bold',
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  productDetailsView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
  },
  productDetailsSubView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
  discountPercentage: {
    fontWeight: 500,
    color: 'green',
    fontSize: 13,
  },
  productPrice: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 13,
    textDecorationLine: 'line-through'
  },
  discountedPrice: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 13
  },
  rating: {
    color: 'darkblue',
    fontSize: 13
  }

});
