/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({title, canGoBack, FullHeader, productDetail}) => {
  const navigation = useNavigation();

  const HomeHead = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white'}}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon
              name="search"
              size={24}
              color="#00c0ff"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('TabNav')}} >
        <Image
          source={require('../../assets/images/dealdeck_logo.png')}
          style={{
            height: 50,
            width: 50,
            resizeMode: 'contain',
            borderRadius: 35,
          }}
        />
        </TouchableOpacity>
      </View>
    );
  };

  const Head = () => {
    return (
      <View style={[styles.HeaderContainer, {backgroundColor: 'white'}]}>
        <View style={styles.left}>
          {canGoBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          ) : null}
        </View>
        {title ? (
          <Text style={{fontWeight: 'bold', fontSize: 25,     color: 'black'        }}> {title} </Text>
        ) : null}
        {productDetail ? (
          <View style={styles.prodDetailsRight}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Cart')}
                style={{marginRight: 45}}>
                <Icon name="heart" size={24} color="red" />
              </TouchableOpacity>
              <Icon name="heart" size={24} color="gray" />
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Icon name="share" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.prodDetailsRight}>
            <TouchableOpacity onPress={() => {}} style={{marginRight: 10}}>
              <Icon
                name="search"
                size={24}
                color="#00c0ff"
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return FullHeader ? <HomeHead /> : <Head />;
};

export default CustomHeader;

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    height: 50,
    backgroundColor: '#00C0FF',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 25,
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 10,
    marginBottom: 10,
    width: '80%',
  },
  iconContainer: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    color: 'black'
  },
  iconStyle: {
    marginRight: 15,
    marginTop: 4,
  },
});
