import React from 'react';
import { TextInput, StyleSheet, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';


const CustomTextInput = ({ placeholder, onChangeText, value,style={},  backgroundColor, secureTextEntry,keyboardType }) => {
    const screenWidth = Dimensions.get('window').width;


    return (
        <TextInput
            multiline={false}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            style={[styles.input,style, { backgroundColor,}, ]}
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            scrollEnabled={false}
            keyboardType={keyboardType}
            autoCapitalize='none'
            placeholderTextColor={'black'}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        // borderBottomColor: '#00c0ff',
        // borderWidth: 1,
        // borderRadius: 7,
        // borderBottomWidth: 1 ,
        borderColor: '#00c0ff',
        // backgroundColor: '#E0E0E0',
        // borderStyle: 'solid',
        // color: '#000',
        fontWeight: '400',
        // paddingVertical:0, marginRight:0, marginLeft:0,
    },
});

export default CustomTextInput;
