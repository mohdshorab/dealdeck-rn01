import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ImageBackground,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../components/Header';
import { useStore } from '../../store';
import Carousel from '../../components/ImageCarousel';
import { carouselJson } from '../../constants/dummyJSONs';
import { CategoryImages } from '../../constants/categoriesImage';
import { observer } from 'mobx-react';
import { MasonryTiles } from '../../components/Mansory/masonryTiles';
import Icon from 'react-native-vector-icons/FontAwesome';
import SaleBanner from '../../components/SaleBanner';

const HomeScreen = observer(({ navigation }) => {
  const { auth, products } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [nextGenProducts, setNextGenProducts] = useState([]);

  useEffect(() => {
    setLoader(true);
    products.loadProductsCategories();
    products.loadRandomProducts();
    fetchRecentlyViewedProducts();
    getTheNextGenProducts();
    console.log(products.randomProduct);
  }, []);

  const fetchRecentlyViewedProducts = async () => {
    try {
      const product = await products.getRecentlyViewedProducts();
      setRecentlyViewedProducts(product || []);
    } catch (error) {
      console.error('Error fetching recently viewed products:', error);
      setRecentlyViewedProducts([]);
    }
  };

  const getTheNextGenProducts = async () => {
    try {
      const res = await products.loadNextGenProduct();
      setNextGenProducts(res);
    } catch (error) {
      console.error('Error loading Next Gen products:', error);
    }
    setLoader(false);
  };

  const categoryWithImages = products.productCategories.map(categoryName => ({
    name: categoryName,
    image: CategoryImages[categoryName],
  }));

  const handleRefresh = () => {
    setLoader(true);
    setRefreshing(true);
    products.loadProductsCategories();
    products.loadRandomProducts();
    fetchRecentlyViewedProducts();
    setRefreshing(false);
    setLoader(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader title={'DealDeck'} FullHeader />
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'DealDeck'} FullHeader />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            title="Release to refresh"
          />
        }>
        <Carousel
          images={carouselJson.images}
          autoplay={true}
          showsPagination={true}
        />
        <View>
          <Text style={styles.collectionText}>Collections</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categoryWithImages.length > 0 &&
              categoryWithImages.map(item => {
                const formattedName = item.name
                  .replace(/-/, ' ')
                  .replace(/\b\w/g, match => match.toUpperCase());
                return (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.itemContainer}
                    onPress={() => {
                      navigation.navigate('ProductsOfCategory', {
                        category: item.name,
                      });
                    }}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                    <Text style={styles.name}>{formattedName}</Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        {/* <View
          style={{
            height: 3,
            backgroundColor: 'gray',
            alignSelf: 'center',
            width: '100%',
            marginVertical: 5,
          }}
        /> */}
        {recentlyViewedProducts.length > 0 ? (
          <>
            <Text style={styles.recentlyViewText}>Recently viewed Items</Text>
            <FlatList
              data={recentlyViewedProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ProductDetail', { productData: item });
                  }}
                  style={[styles.productTile]}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productBrand}>{item.brand}</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={styles.productPrice}>${item.price} </Text>
                    <Icon name="chevron-right" color="green" size={13} />
                    <Text style={styles.productDiscountPrice}>
                      {' '}
                      ${' '}
                      {(
                        item.price -
                        (item.price * item.discountPercentage) / 100
                      ).toFixed(0)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        ) : null}
        <SaleBanner
          saleText={'Laptop Sale'}
          sloganText={'Unleash Your Productivity, Anywhere'}
          discountText={'Up to 50% OFF'}
          bgImage={require('../../assets/images/black-bg.jpg')}
          floatingImage1={require('../../assets/images/legion_nobg.png')}
          floatingImage2={require('../../assets/images/ROG_NOBG.png')}
          onPress={() => {
            navigation.navigate('ProductsOfCategory', { category: 'laptops' });
          }}
        />
        {/* New In products snippet */}
        <View style={styles.NewInView}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              fontWeight: '700',
              color: 'black',
            }}>
            Next Gen Products
          </Text>
          <TouchableOpacity>
            <Text style={{ color: '#51AF75', fontWeight: '700' }}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {nextGenProducts.length > 0 &&
            nextGenProducts.map(item => {
              const formattedName =
                item.title.split(' ').length > 2
                  ? item.title.split(' ').slice(-2).join(' ')
                  : item.title;

              return (
                <TouchableOpacity
                  key={item.name}
                  style={styles.itemContainer}
                  onPress={() => {
                    console.log('SSS', item.title);
                    navigation.navigate('ProductsOfCategory', { category: item.title });
                  }}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.images[0] }}
                      style={styles.image}
                    />
                  </View>
                  <Text style={styles.name}>{formattedName}</Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
        <View
          style={{
            height: 3,
            backgroundColor: 'gray',
            alignSelf: 'center',
            width: '100%',
            marginVertical: 5,
          }}
        />
        <View style={styles.NewInView}>
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              fontWeight: '700',
              color: 'black',
            }}>
            Products you may like
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('ProductsYouMayLike')} >
            <Text style={{ color: '#51AF75', fontWeight: '700' }}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.NewItemsList}>
          <View style={styles.NewItemsList}>
            {products.randomProduct.map((item, index) => {
              if (index % 3 === 0) {
                const nextItem1 = products.randomProduct[index + 1];
                const nextItem2 = products.randomProduct[index + 2];
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
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  NewItemsList: {
    padding: 10,
    paddingTop: 3,
    // backgroundColor: '#ADD8E6'
  },
  itemContainer: {
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  imageContainer: {
    width: 50,
    height: 70,
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  name: {
    marginTop: 2,
    textAlign: 'center',
    color: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Adjust the spacing between rows if needed
  },
  productTile: {
    padding: 10,
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    width: 175,
    borderColor: '#999999',
  },
  productImage: {
    width: '100%',
    height: 100,
  },
  productName: {
    fontWeight: 'bold',
    marginTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    color: '#2D333A',
    color: 'black',
  },
  productDiscountPrice: {
    color: 'green',
    marginTop: 2,
  },
  productPrice: {
    color: 'green',
    marginTop: 2,
    textDecorationLine: 'line-through',
  },
  productBrand: {
    fontWeight: 'bold',
    marginTop: 5,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
    color: 'black',
  },
  collectionText: { fontSize: 20, margin: 10, fontWeight: '700', color: 'black' },
  recentlyViewText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
    marginTop: 5,
    color: 'black',
  },
  NewInView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 20,
    marginBottom: 5,
  },
});

export default HomeScreen;
