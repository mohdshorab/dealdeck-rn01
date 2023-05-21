import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const CustomImage = ({ source, resizeMode, marginLeft, style }) => {
  return (
    <View style={[styles.container,{marginLeft}]}>
      <Image
        source={source}
        resizeMode={resizeMode || 'cover'}
        style={[styles.image, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default CustomImage;
