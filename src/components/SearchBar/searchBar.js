import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const SearchBar = ({pickerItems}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon
          name="search1"
          size={24}
          color="#00c0ff"
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <TextInput style={styles.searchInput} placeholder="Search" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 5,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 8,
  },
  filterIconContainer: {
    // padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height:'50%',
    // width: '100%'
  },
  iconStyle: {
    marginRight: 15,
    marginTop: 4,
  },
});

export default SearchBar;
