import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import CustomHeader from '../../components/Header';
import Carousel from '../../components/ImageCarousel';
import { useStore } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library you're using
import { observer } from 'mobx-react';
import { MasonryTiles } from '../../components/Mansory/masonryTiles';
import SaleBanner from '../../components/SaleBanner';

const ProductDetail = observer(({ route, navigation }) => {
  const { products, cart } = useStore();
  const { productData } = route.params;
  const [similarProducts, setSimilarProducts] = useState([]);
  const [pincode, setPincode] = useState('');
  const [refreshing, setRefreshing] = useState(false); // Define the refreshing state

  const [showLoader, setLoader] = useState(false);
  const emi = (productData.price / 6).toFixed(2);

  useEffect(() => {
    console.log(productData);
    setLoader(true);
    getSimilarProduct();
    setPincode('');
    products.loadRandomProducts();
    setLoader(false);
  }, []);

  useEffect(() => {
    products.addRecentlyViewedProduct(productData);
  }, [productData]);

  const getSimilarProduct = async () => {
    const res = await products.loadProductsOfCategory(productData.category);
    const filteredSimilarProducts = res.filter(
      product => product.id !== productData.id,
    );
    setSimilarProducts(filteredSimilarProducts);
  };

  const handleRefresh = () => {
    setLoader(true);
    setRefreshing(true);
    getSimilarProduct();
    products.loadRandomProducts();
    setRefreshing(false);
    setLoader(false);
  };

  const handlePincodeChange = text => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 6) {
      setPincode(numericText);
    }
  };

  const handleCheckDelivery = () => {
    const isDeliverable = checkDeliveryAvailability(pincode);
    if (isDeliverable) {
      Alert.alert('Hurray', 'Product is deliverable to your pincode.');
    } else {
      Alert.alert('Sorry', 'Product cannot be delivered to your pincode.');
    }
  };

  const checkDeliveryAvailability = pincode => {
    return pincode === '110016';
  };

  if (showLoader) {
    return (
      <SafeAreaView>
        <CustomHeader showCart canGoBack navigation={navigation} />
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader count={cart.cartCount} showCart canGoBack productDetail titleOnHead={productData.title.split(" ").splice(-3).join(" ")} navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            title="Release to refresh"
          />
        }>
        <Carousel
          images={productData.images}
          showsPagination
          height={200}
        // showsButtons={true}
        />
        <View style={styles.subContainer}>
          <View style={styles.straightLine} />
          <View
            style={{
              // paddingVertical: 10,
              borderRadius: 10,
            }}>
            <View style={styles.brandView}>
              <Text style={styles.moreProductText}>More products from </Text>
              <TouchableOpacity>
                <Text style={styles.BrandNameText}>{productData.brand}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productTitle}>{productData.title}</Text>
            <View style={styles.starRatingView}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={productData.rating}
                starSize={16}
                fullStarColor={'black'}
              />
              <TouchableOpacity>
                <Text style={styles.ratingText}>{productData.reviews.length} ratings</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.priceView}> */}
            <View style={styles.emiView}>
              <Text style={styles.emiText}>EMI starts from</Text>
              <Text style={styles.emiText}> ${emi} </Text>
              <TouchableOpacity style={styles.infoButton}>
                <Icon name="info" size={12} color="green" />
              </TouchableOpacity>
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
              <Icon name="long-arrow-down" size={15} color="green" />
              <Text style={styles.discountPercentage}>
                {productData.discountPercentage.toFixed(0)}%{' '}
              </Text>
              <Text style={styles.mrpText}>$ {productData.price} </Text>
              <Text style={styles.priceText}>
                $
                {(
                  productData.price -
                  productData.price *
                  (productData.discountPercentage.toFixed(0) / 100)
                ).toFixed(0)}{' '}
              </Text>
              {/* </View> */}
            </View>
            <Text style={styles.descriptionText}>
              {productData.description}
            </Text>
          </View>
          <View style={styles.straightLine} />
          <Text style={{ fontWeight: '600', marginTop: 0, color: 'black' }}>
            Check the product availability at your pincode.
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 15,
              alignSelf: 'center',
            }}>
            <TextInput
              style={{
                width: 200,
                height: 40,
                borderWidth: 1,
                borderColor: 'gray',
                paddingHorizontal: 10,
              }}
              keyboardType="numeric"
              maxLength={6}
              value={pincode}
              onChangeText={handlePincodeChange}
              placeholder="Enter Pincode"
              placeholderTextColor={'black'}
            />
            <TouchableOpacity
              style={[
                styles.pincodeBtn,
                pincode.length !== 6 && styles.buttonDisabled,
              ]}
              onPress={handleCheckDelivery}
              disabled={pincode.length !== 6}>
              <Text style={styles.checkDeliveryBtn}>Check Delivery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.straightLine} />

          <View style={styles.optionContainer}>
            <View style={styles.option}>
              <Icon name="times-circle" size={25} color="blue" style={styles.icon} />
              <Text style={styles.optionText}>{productData.returnPolicy}</Text>
            </View>
            <View style={styles.option}>
              <Icon
                name="money"
                size={25}
                color="darkgreen"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Cash on delivery</Text>
            </View>
            <View style={styles.option}>
              <Icon name="truck" size={25} color="blue" style={styles.icon} />
              <Text style={styles.optionText}>{productData.shippingInformation}</Text>
            </View>
          </View>
          <View style={styles.straightLine} />

          {productData.category !== 'smartphones' ||
            'laptops' ||
            'furniture' ? (
            <>
              <View style={{ justifyContent: 'space-evenly', flexDirection: 'row' }} >
                <Text style={{ alignSelf: 'center', color: '#4a4b4d', fontWeight: 'bold', borderWidth: 0.5, padding: 2 }}>
                  {productData.brand}
                </Text>
                <Text style={{ alignSelf: 'center', color: 'black' }}>
                  {productData.warrantyInformation}
                </Text>
                <Text style={{ alignSelf: 'center', color: 'black' }}>
                  Know More
                </Text>
              </View>
              <View style={styles.straightLine} />
            </>
          ) : null}

          {/* SIMILAR PRODUCTS */}
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.similarProductsText}>Similar Products</Text>
          </TouchableOpacity>
          <ScrollView
            style={styles.similarProductsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {similarProducts.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('ProductDetail', { productData: item });
                  }}
                  style={{
                    marginRight: 10,
                    width: 130,
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 5,
                  }}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.similarProductImage}
                  />
                  <Text style={styles.similarProductBrand}>{item.brand}</Text>
                  <Text style={styles.similarProductTitle}>{item.title}</Text>
                  <View style={styles.similarProductRatingView}>
                    <Text style={styles.similarProductPrice}>
                      ${item.price}{' '}
                    </Text>
                    <StarRating
                      disabled={true}
                      rating={item.rating}
                      starSize={12}
                      fullStarColor={'green'}
                      maxStars={5}
                      emptyStarColor={'grey'} // Color of the empty star
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.straightLine} />

          <SaleBanner
            saleText={'RBI Card'}
            sloganText={'Your Credit Journey Starts Here'}
            discountText={'Get upto 30% cashback'}
            bgImage={require('../../assets/images/cc-bg.png')}
            floatingImage1={require('../../assets/images/cc-removebg-preview.png')}
            floatingImage1Styles={{
              height: 200,
              width: 200,
              top: -75,
              right: -25,
            }}
            floatingImage2={require('../../assets/images/cc-2-removebg-preview.png')}
            floatingImage2Styles={{ bottom: -40, left: -22 }}
          />

          {/* New In products snippet */}
          <TouchableOpacity onPress={() => { }}>
            <Text style={styles.similarProductsText}>
              Products you may like
            </Text>
          </TouchableOpacity>
          <View>
            {products.randomProduct.map((item, index) => {
              // Check if the current index is divisible by 3 to create triplets
              if (index % 3 === 0) {
                const nextItem1 = products.randomProduct[index + 1];
                const nextItem2 = products.randomProduct[index + 2];
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}
                    key={item.id}>
                    <MasonryTiles product={item} navigation={navigation} />
                    {nextItem1 && (
                      <MasonryTiles
                        product={nextItem1}
                        index={index}
                        navigation={navigation}
                      />
                    )}
                    {nextItem2 && (
                      <MasonryTiles
                        product={nextItem2}
                        index={index}
                        navigation={navigation}
                      />
                    )}
                  </View>
                );
              }
              return null;
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomSpacer} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            cart.addItemToCart(productData)
          }}
          style={[styles.button, styles.yellowButton]}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.redButton]}>
          <Text style={[styles.buttonText, { color: 'white' }]}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  FixedBtn: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust as needed
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:10,
  },
  yellowButton: {
    backgroundColor: 'white',
  },
  redButton: {
    backgroundColor: 'green',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  option: {
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  optionText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
    marginTop: 5
  },
  subContainer: { marginTop: '10%', width: '95%', alignSelf: 'center' },
  brandView: { flex: 1, flexDirection: 'row' },
  moreProductText: { fontWeight: 'bold', fontSize: 15, color: 'grey' },
  BrandNameText: { fontWeight: 'bold', fontSize: 15, color: 'black' },
  productTitle: { fontWeight: 'bold', fontSize: 25, color: 'black' },
  starRatingView: { flex: 1, flexDirection: 'row', marginTop: 2 },
  straightLine: {
    borderWidth: 0.5,
    borderBottomColor: 'grey',
    marginVertical: 15,
    shadowOpacity: 1,
  },
  bottomSpacer: { marginVertical: 15, shadowOpacity: 1, height: 20 },
  similarProductBrand: { fontSize: 13, marginTop: 5, color: 'black' },
  similarProductTitle: { fontSize: 13, fontWeight: '500', color: 'black' },
  similarProductPrice: { color: 'black', fontWeight: '800' },
  similarProductRatingView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
  },
  separatorLine: {
    borderWidth: 0.5,
    borderBottomColor: 'grey',
    marginVertical: 15,
    shadowOpacity: 1,
  },
  similarProductsText: {
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '900',
    color: '#01BFFF',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 15,
    color: '#4a4b4d',
    fontWeight: 'bold',
  },
  emiText: { fontSize: 15, color: 'black' },
  priceText: { fontWeight: 'bold', fontSize: 18, color: 'black' },
  ratingText: { color: 'black', marginLeft: 10 },
  priceView: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  emiView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  infoButton: {
    height: 20,
    width: 20,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingTop: 3,
  },
  similarProductsContainer: { flex: 1, flexDirection: 'row' },
  similarProductImage: {
    height: 140,
    width: 110,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    // justifyContent: 'space-evenly',
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
  },
  discountPercentage: { fontWeight: '500', fontSize: 15, color: 'black' },
  mrpText: {
    fontWeight: '500',
    fontSize: 15,
    textDecorationLine: 'line-through',
    color: 'black'
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  pincodeBtn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  checkDeliveryBtn: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
