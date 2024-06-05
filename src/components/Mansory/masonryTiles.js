import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View, Platform } from 'react-native';
import StarRating from 'react-native-star-rating';

export const MasonryTiles = ({ product, index, navigation }) => {
  // const formattedTitle = product.title.replace(/-/, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
  const ActualPrice =
    product.price + (product.price * product.discountPercentage) / 100;
  const notEvenIndex = index % 2 !== 0;
  const getRandomNumber = () => Math.random();
  // (50% probability)
  const isBestseller = getRandomNumber() > 0.5;

  return (
    <TouchableOpacity
      style={[styles.itemContainer, notEvenIndex && styles.evenItemContainer]}
      onPress={() => navigation.push('ProductDetail', { productData: product })}>
      <Image source={{ uri: product.thumbnail }} style={styles.itemImage} />
      {isBestseller && (
        <View style={styles.shadowContainer}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 10 }}>
            Bestseller
          </Text>
        </View>
      )}
      <View style={styles.ratingContainer}>
        <Text style={{ color: 'green', fontWeight: '500' }} > {product.rating}</Text>
        <StarRating
          disabled={true}
          maxStars={1}
          rating={product.rating}
          starSize={16}
          fullStarColor={'green'}
        />
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 10 }} >
        <Text style={styles.itemTitle} adjustsFontSizeToFit numberOfLines={2}>
          {product.title.split(" ").splice(-3).join(" ")}
        </Text>
        {/* <View style={styles.productDetailsView}>
          <Text style={styles.discountPercentage}>
            {product.discountPercentage}% off
          </Text>
        </View>
        <View style={styles.productDetailsView}>
          <Text style={styles.productPrice}>${ActualPrice.toFixed(2)}</Text>
        </View> */}
        <Text style={styles.discountedPrice}>
          @ ${product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    overflow: 'hidden',
    width: '50%',
    backgroundColor: '#fff',
    borderWidth: 0.2,
    marginRight: 10, // Add margin only if the index is even,'

  },
  evenItemContainer: {
    flex: 1,
    overflow: 'hidden',
    width: '50%',
    backgroundColor: '#fff',
    borderWidth: 0.2,
    marginRight: 10, // Add margin only if the index is even,'
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  itemTitle: {
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
    color: 'black',
    fontWeight:'500'
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
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontWeight: '500',
    color: 'black',
    fontSize: 13,
    paddingTop:10
  },
  rating: {
    color: 'darkblue',
    fontSize: 13,
  },
  imageContainer: {
    position: 'relative',
  },
  ratingContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 80,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 2,
    borderTopRightRadius: 10
  },
  shadowContainer: {
    position: 'absolute',
    top: 5,
    left: 0,
    fontWeight: 'bold',
    // borderWidth:1,
    backgroundColor: '#000000',
    padding: 2,
  },
});
