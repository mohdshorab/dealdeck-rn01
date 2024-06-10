import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomButton = ({ title, onPress, buttonStyle = {}, textStyle = {} }) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00C0FF',
    borderRadius: 8,
    // paddingVertical: 5,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;