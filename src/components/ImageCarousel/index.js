import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

const Carousel = ({ images, onPress }) => {
  return (

      <Swiper
        autoplay
        loop
        height={160}
        showsPagination={false}
        autoplayTimeout={4.5}
        onScrollAnimationEnd
        loadMinimalLoader={<ActivityIndicator />}
      >
        {images.map((image, index) => (
          <TouchableOpacity onPress={onPress} key={index} style={styles.slide}>
              <Image source={image.image} style={styles.image} />
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
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default Carousel;
