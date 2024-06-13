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
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import CustomHeader from '../../components/Header';
import { useStore } from '../../store';
import Carousel from '../../components/ImageCarousel';
import { carouselJson } from '../../constants/dummyJSONs';
import { CategoryImages } from '../../constants/categoriesImage';
import { observer } from 'mobx-react';
import { MasonryTiles } from '../../components/Mansory';
import Icon from 'react-native-vector-icons/FontAwesome';
import SaleBanner from '../../components/SaleBanner';

const HomeScreen = observer(({ navigation }) => {
  const { products, auth } = useStore();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (auth.profileData && Object.keys(auth.profileData).length > 0) {
          await products.fetchRecentlyViewedProducts(auth.profileData);
        }
      } catch (err) {
        console.error('Error fetching recently viewed products', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.profileData && Object.keys(auth.profileData).length > 0) {
      fetchData();
    }
  }, [auth.profileData, products.fetchRecentlyViewedProducts]);

  const categoryWithImages = products.productCategories.map(item => ({
    name: item.name,
    image: CategoryImages[item.slug],
    slug: item.slug
  }));

  const handleRefresh = async () => {
    setIsLoading(true);
    setRefreshing(true);
    try {
      await products.init(auth.profileData);
    } catch (err) {
      console.error('Unable to fetch data', err);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader showFullHead navigation={navigation} />
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader showFullHead navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Carousel images={carouselJson.images} autoplay showsPagination />
        <View>
          <Text style={styles.collectionText}>Collections</Text>
          {categoryWithImages.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categoryWithImages.map(item => (
                <TouchableOpacity
                  key={item.slug}
                  style={styles.itemContainer}
                  onPress={() => navigation.navigate('ProductsOfCategory', { category: item.slug })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                  </View>
                  <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.errorText}>Unable to fetch collections</Text>
          )}
        </View>
        {products.recentlyViewedProducts && products.recentlyViewedProducts.length > 0 ? (
          <>
            <Text style={styles.recentlyViewedText}>Recently viewed Items</Text>
            <FlatList
              data={products.recentlyViewedProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProductDetail', { productData: item })}
                  style={styles.productTile}
                >
                  <Image source={{ uri: item.thumbnail }} style={styles.productImage} resizeMode="contain" />
                  <Text style={styles.productBrand}>{item.brand}</Text>
                  <Text style={styles.productName}>{item.title.split(" ").splice(-3).join(" ")}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>${(item.price + (item.price * item.discountPercentage) / 100).toFixed(0)}</Text>
                    <Icon name="chevron-right" color="green" size={13} />
                    <Text style={styles.productDiscountPrice}>
                      ${item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        ) : products.recentlyViewedProducts.length !== 0 && (
          <Text style={styles.errorText}>Unable to fetch recently viewed items</Text>
        )
        }
        <SaleBanner
          saleText="Laptop Sale"
          sloganText="Unleash Your Productivity, Anywhere"
          discountText="Up to 50% OFF"
          bgImage={require('../../assets/images/black-bg.jpg')}
          floatingImage1={require('../../assets/images/legion_nobg.png')}
          floatingImage2={require('../../assets/images/ROG_NOBG.png')}
          onPress={() => navigation.navigate('ProductsOfCategory', { category: 'laptops' })}
        />
        <View style={styles.divider} />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Products you may like</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductsYouMayLike')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        {products.randomProduct.length > 0 ? (
          <View style={styles.newItemsList}>
            {products.randomProduct.map((item, index) => {
              if (index % 3 === 0) {
                const nextItem1 = products.randomProduct[index + 1];
                const nextItem2 = products.randomProduct[index + 2];
                return (
                  <View style={styles.rowContainer} key={item.id}>
                    <MasonryTiles product={item} navigation={navigation} />
                    {nextItem1 && <MasonryTiles product={nextItem1} navigation={navigation} />}
                    {nextItem2 && <MasonryTiles product={nextItem2} navigation={navigation} />}
                  </View>
                );
              }
              return null;
            })}
          </View>
        ) : (
          <Text style={styles.errorText}>Unable to fetch products you may like</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  collectionText: {
    fontSize: 20,
    margin: 10,
    fontWeight: '700',
    color: 'black',
  },
  recentlyViewedText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
    marginTop: 5,
    color: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  itemContainer: {
    padding: 5,
    alignItems: 'center',
    marginLeft: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 50,
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
    fontWeight: '500',
    fontSize: 12,
  },
  productTile: {
    padding: 10,
    borderRadius: 20,
    margin: 10,
    borderWidth: 1,
    width: 150,
    borderColor: '#999999',
  },
  productImage: {
    width: '100%',
    height: 100,
  },
  productName: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  productBrand: {
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
    color: '#4a4b4d',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPrice: {
    color: 'green',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  productDiscountPrice: {
    color: 'green',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
  },
  seeAllText: {
    color: 'blue',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 10,
  },
  newItemsList: {
    padding: 10,
    paddingTop: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default HomeScreen;
