import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useStore } from '../../store';
import { observer } from 'mobx-react';

const CustomHeader = observer(({ showFullHead, navigation, titleOnHead, showCart }) => {
  const { cart } = useStore();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearchIconPress = () => {
    setIsSearchBarVisible(true);
    setSearchText('');
  };

  const handleSearchBlur = () => {
    setIsSearchBarVisible(false);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      {showFullHead ? (
        <>
          <Image
            source={require('../../assets/images/dealdeck_logo.png')}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              borderRadius: 35,
            }}
          />
          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <Icon name="search" size={24} color="#000" />
            <Text style={styles.inputPlaceholder}>Search items</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} >
            <Icon name="shopping-cart" size={24} color="#000" />
            <Text>{cart.cartItems.length}</Text>
          </TouchableOpacity>
        </>
      ) : (
        < View style={[styles.productDetailHeader, { justifyContent: showCart ? 'space-between' : null }]}>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={20} color="#000" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.productName}>{titleOnHead}</Text>
          </View>
          {showCart ?
            (
              <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} >
                <Icon name="shopping-cart" size={24} color="#000" />
                <View
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -5,
                    fontWeight: 'bold',
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 15,
                    alignItems: 'center'
                  }
                  }
                >
                  <Text style={{color:'white', fontWeight: 'bold', fontSize:12}} >{cart.cartItems.length}</Text>
                </View>
              </TouchableOpacity>
            )
            : null}
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
    paddingVertical: 8,
    flex: 1,
    marginHorizontal: 16,
  },
  inputPlaceholder: {
    marginLeft: 8,
    color: '#000',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#000',
  },
  productDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
});

export default CustomHeader;