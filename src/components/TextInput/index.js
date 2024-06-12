import React from 'react';
import { TextInput, StyleSheet, ScrollView, Text, View } from 'react-native';
import { Dimensions } from 'react-native';


const CustomTextInput = ({maxLength = 30, label,multiline,placeholder, onChangeText, value, style = {}, labelStyle = {}, backgroundColor, secureTextEntry, keyboardType, placeholderTextColor, onEndEditing={} }) => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <>
            {label && <Text style={labelStyle} >{label}</Text>}
            <TextInput
                multiline={multiline ? multiline : false }
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={[styles.input, style, { backgroundColor, },]}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                scrollEnabled={false}
                keyboardType={keyboardType}
                autoCapitalize='none'
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'black'}
                maxLength={maxLength}
            />
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderColor: '#00c0ff',
        color: 'black',
        fontWeight: '400',
        // 4a4b4d
    },
});

export default CustomTextInput;
