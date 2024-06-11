import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from '../../store';
import { observer } from 'mobx-react';

const CustomHeader = observer(({ showFullHead, navigation, titleOnHead, showCart, titleStyle }) => {
  const { cart } = useStore();
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = async (text) => {
    const res = await getSearchResults(text);
    setSearchText(text);
  };

  const renderCartIcon = () => (
    <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
      <Icon name="shopping-cart" size={24} color="#4a4b4d" />
      {cart.cartCount > 0 && (
        <View style={styles.cartCountContainer}>
          <Text style={styles.cartCountText}>{cart.cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {showFullHead ? (
        <>
          <Image
            source={require('../../assets/images/dealdeck_logo.png')}
            style={styles.logo}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search products"
              value={searchText}
              onChangeText={handleSearchTextChange}
              placeholderTextColor={'#000'}
            />
            <Icon name="search" size={24} color="#000" />
          </View>
        </>
      ) : (
        <View style={[styles.productDetailHeader, showCart && { justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={[styles.productName, titleStyle]}>{titleOnHead}</Text>
          </View>
          {showCart && renderCartIcon()}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 16,
  },
  input: {
    flex: 1,
    color: '#000',
    paddingVertical:12
  },
  productDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical:10,
  },
  productName: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  logo: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 35,
  },
  cartCountContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default CustomHeader;