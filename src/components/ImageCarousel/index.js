import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Swiper from 'react-native-swiper';
const Carousel = ({
  images,
  onPress,
  height,
  showsPagination,
  autoplay,
  showsButtons,
}) => {
  return (
    <View style={{ height: 200, width: '100%', backgroundColor: 'white' }}>
      <Swiper
        autoplay={autoplay ? autoplay : null} // Set autoplay based on the 'autoplay' prop
        loop
        height={height ? height : 160}
        showsPagination={showsPagination ? showsPagination : false}
        autoplayTimeout={3}
        onScrollAnimationEnd
        loadMinimalLoader={<ActivityIndicator />}
        showsButtons={showsButtons ? true : false}
        index={1}>
        {images.map((image, index) => (
          <TouchableOpacity onPress={onPress} key={index} style={styles.slide}>
            {typeof image === 'string' ? (
              <Image source={{ uri: image }} style={[styles.image,{resizeMode: 'contain'}]} />
            ) : (
              <Image source={image.image} style={styles.image} />
            )}
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
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
