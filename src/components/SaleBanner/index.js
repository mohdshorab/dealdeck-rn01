import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

//Add one more prop which accepts the category and nav to the screen with products of that category
const SaleBanner = ({
  saleText,
  sloganText,
  discountText,
  bgImage,
  floatingImage1,
  floatingImage2,
  floatingImage1Styles,
  floatingImage2Styles,
  onPress,
}) => {
  const animatedColors = useRef(new Animated.Value(0)).current;

  const startColorAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedColors, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedColors, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startColorAnimation();
  }, []);

  const interpolatedColors = animatedColors.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ffffff', 'gray'],
  });
  // saleText, sloganText, discountText, bgImage, floatingImage1, floatingImage2
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={bgImage} style={styles.bannerContainer}>
        <View style={styles.contentContainer}>
          <Animated.Text style={[styles.saleText, {color: interpolatedColors}]}>
            {saleText}
          </Animated.Text>
          <Animated.Text
            style={[styles.sloganText, {color: interpolatedColors}]}>
            {sloganText}
          </Animated.Text>
          <Animated.Text
            style={[styles.discountText, {color: interpolatedColors}]}>
            {discountText}
          </Animated.Text>
        </View>
        {/* <View style={styles.imageContainer}> */}
        <Image
          source={floatingImage1}
          style={[
            styles.floatingImage,
            styles.topImage,
            {height: 120, width: 120},
            floatingImage1Styles,
          ]}
        />
        {/* </View> */}
        <Image
          source={floatingImage2}
          style={[
            styles.floatingImage,
            styles.bottomImage,
            {height: 100, width: 100},
            floatingImage2Styles,
          ]}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    // padding: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    height: 120,
    marginVertical: 10,
    marginTop: 25,
  },
  contentContainer: {
    flex: 1,
  },
  saleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  sloganText: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  discountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
    width: 150,
  },
  floatingImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  topImage: {
    top: -40, // Move the top image partially outside the banner
    right: 0,
  },
  middleImage: {
    bottom: 0,
    right: 0,
  },
  bottomImage: {
    bottom: -35,
    left: 0,
  },
});

export default SaleBanner;
