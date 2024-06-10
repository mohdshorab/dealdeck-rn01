import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

const CarouselWithThumbnails = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainCarouselRef = useRef(null);
  const thumbnailCarouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.mainImageContainer}>
      <Image source={{ uri: item }} style={styles.mainImage} />
    </View>
  );

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleThumbnailPress(index)}>
      <Image source={{ uri: item }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  const handleSnapToItem = (index) => {
    setActiveIndex(index);
    if (mainCarouselRef.current) {
      mainCarouselRef.current.snapToItem(index);
    }
    if (thumbnailCarouselRef.current) {
      thumbnailCarouselRef.current.snapToItem(index);
    }
  };

  const handleThumbnailPress = (index) => {
    setActiveIndex(index);
    if (mainCarouselRef.current) {
      mainCarouselRef.current.snapToItem(index);
    }
    if (thumbnailCarouselRef.current) {
      thumbnailCarouselRef.current.snapToItem(index);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={mainCarouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={handleSnapToItem}
        firstItem={activeIndex}
      />
      <Carousel
        ref={thumbnailCarouselRef}
        data={images}
        renderItem={renderThumbnail}
        sliderWidth={width}
        itemWidth={80}
        inactiveSlideOpacity={0.5}
        onSnapToItem={handleSnapToItem}
        firstItem={activeIndex}
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingVertical: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotStyle={{
          backgroundColor: 'gray',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mainImageContainer: {
    width: width,
    height: 300,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  thumbnail: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 5,
  },
});

export default CarouselWithThumbnails;
