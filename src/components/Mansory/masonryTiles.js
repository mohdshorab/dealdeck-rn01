import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View, } from "react-native";
import StarRating from 'react-native-star-rating';



export const MasonryTiles = ({ product, index, navigation }) => {
  // const formattedTitle = product.title.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const notEvenIndex = index % 2 !== 0;
  const getRandomNumber = () => Math.random();
  // (50% probability)
  const isBestseller = getRandomNumber() > 0.5;

  return (
    <TouchableOpacity style={[styles.itemContainer, notEvenIndex && styles.evenItemContainer]}
      onPress={() => navigation.navigate('Products', { productData: product })}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.itemImage} />
      {isBestseller && <View style={styles.shadowContainer}>
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10 }} >Bestseller</Text>
      </View>}
      <View style={styles.ratingContainer}>
        <Text> {product.rating}</Text>
        <StarRating
          disabled={true}
          maxStars={1}
          rating={product.rating}
          starSize={16}
          fullStarColor={'green'}
        />
      </View>
      <Text style={styles.itemTitle} adjustsFontSizeToFit numberOfLines={1} >{product.title}</Text>
      <View style={styles.productDetailsView} >
        <Text style={styles.discountPercentage} >{product.discountPercentage}% off</Text>
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
    // borderRadius: 8,
    overflow: 'hidden',
    width: '50%',
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 0.2,
    // borderColor:'#999999',
    marginRight: 10, // Add margin only if the index is even,'
  },
  evenItemContainer: {
    flex: 1,
    // borderRadius: 8,
    overflow: 'hidden',
    width: '50%',
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 0.2,
    marginRight: 10, // Add margin only if the index is even,'
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10
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
    color: 'black',
    fontSize: 13
  },
  rating: {
    color: 'darkblue',
    fontSize: 13
  },
  imageContainer: {
    position: 'relative',
  },
  ratingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 62,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add a semi-transparent background to the rating container
    padding: 2, // Add some padding around the rating stars
    borderRadius: 4, // Add a border radius for a rounded appearance
  },
  shadowContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    fontWeight: 'bold',
    // borderWidth:1,
    backgroundColor: '#000000',
    padding: 2

  }

});
