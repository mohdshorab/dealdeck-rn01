import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useStore } from '../../store';
import { observer } from 'mobx-react';
import CustomHeader from '../../components/Header';
import { MasonryTiles } from '../../components/Mansory';
// eslint-disable-next-line no-unused-vars
import { categoriesName, imageUrls } from '../../constants/dummyJSONs';

const ProductsOfCategory = observer(({ route, navigation }) => {
  const { category } = route.params;
  const { products } = useStore();
  const [productsOfCat, setProductsOfCat] = useState([]);
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    getTheProducts();
  }, []);

  const getTheProducts = async () => {
    setLoader(true);
    const res = await products.fetchProductsByCategory(category);
    res.length > 0 ? setProductsOfCat(res) : null;
    setLoader(false);
  };

  const CategoryImage = () => {
    console.log('CATEGORY', category)
    const imageSrc = imageUrls[category] || imageUrls.default;

    return <Image source={{ uri: imageSrc }} style={styles.stateicImageBanner} />;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
        <CustomHeader
          titleOnHead={category.charAt(0).toUpperCase() + category.slice(1)}
          navigation={navigation}
        />
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  }

  const bgImage = category == 'laptops' || 'smartphones' ? 'https://img.freepik.com/free-vector/paper-style-white-monochrome-background_23-2149014827.jpg' : 'https://images.unsplash.com/photo-1620503374956-c942862f0372?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbG9yJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={{
          uri: bgImage,
        }}>
        <CustomHeader
          navigation={navigation}
          titleOnHead={category.charAt(0).toUpperCase() + category.slice(1)}
          showCart
        />
        <ScrollView
          style={{
            // backgroundColor: 'white',
            marginTop: 10,
            alignSelf: 'center',
          }}>
          <CategoryImage />
          <Text style={styles.productTitleText}>SPOTLIGHT DEALS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          // style={{backgroundColor: 'white'}}
          >
            {productsOfCat.length > 0 &&
              productsOfCat.map(item => {
                const discountedPrice =
                  item.price - (item.price * item.discountPercentage) / 100;
                const formattedName = item.title
                  .replace(/-/, ' ')
                  .replace(/\b\w/g, match => match.toUpperCase());
                const words = formattedName
                // .split(' ');
                const lastTwoWords = words

                const bandTitle = item.brand

                return (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.itemContainer}
                    onPress={() => {
                      navigation.navigate('ProductDetail', { productData: item });
                    }}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{ uri: item.images[1] }}
                        style={styles.image}
                      />
                    </View>
                    <Text numberOfLines={1} style={styles.name}>{lastTwoWords}</Text>
                    <Text style={styles.discountedPrice}>
                      From ${discountedPrice.toFixed(0)}
                    </Text>
                    <Text
                      style={{
                        position: 'absolute',
                        left: 0,
                        backgroundColor: '#B1B1B1',
                        top: 5,
                        fontWeight: 'bold',
                        padding: 5,
                      }}>
                      {bandTitle}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
          <View
            style={{
              padding: 5,
              width: '100%',
              marginVertical: 20,
            }}>
            <Text style={styles.productTitleText}>TOP RATED</Text>
            <View style={styles.NewItemsList}>
              {productsOfCat.map((item, index) => {
                if (index % 2 === 0) {
                  const nextItem1 = productsOfCat[index + 1];
                  return (
                    <View style={styles.rowContainer} key={item.id}>
                      <MasonryTiles product={item} navigation={navigation} />
                      {nextItem1 && (
                        <MasonryTiles
                          product={nextItem1}
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
          <View style={{ marginBottom: 40 }} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
    // <Text>{productsOfCat[0].brand}ss</Text>
  );
});

const styles = StyleSheet.create({
  NewItemsList: {
    padding: 10,
    paddingTop: 3,
    marginVertical: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    margin: 5,
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    width: 140,
    height: 150,
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
  imageContainer: {
    width: 70,
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    marginTop: 2,
    textAlign: 'center',
    color: 'black',
  },
  discountedPrice: {
    color: 'green',
    fontWeight: '700',
  },
  stateicImageBanner: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
    // elevation: 10,
    marginBottom: 10,
    borderRadius: 30,
    // borderBottomRightRadius: 10,
  },
  productTitleText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '900',
    // marginVertical: 10,
    color: 'black',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  straightLine: {
    width: '100%',
    backgroundColor: 'gray',
    height: 2,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default ProductsOfCategory;
