import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

const Carousel = ({ images, onPress, height, showsPagination,autoplay, showsButtons}) => {
  return (
    <Swiper
    autoplay={autoplay ? autoplay : null} // Set autoplay based on the 'autoplay' prop
      loop
      height={height ? height : 160}
      showsPagination={showsPagination ? showsPagination : false}
      autoplayTimeout={3}
      onScrollAnimationEnd
      loadMinimalLoader={<ActivityIndicator />}
      showsButtons={showsButtons ? true : false}
    >
      {images.map((image, index) => (
        <TouchableOpacity onPress={onPress} key={index} style={styles.slide}>
          {typeof image === 'string'
            ? <Image source={{ uri: image }} style={styles.image} />
            : <Image source={image.image} style={styles.image} />
          }
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  // carouselContainer: {
  //   // height: '300',
  //   marginBottom: 20,
  // },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: '95%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

export default Carousel;
