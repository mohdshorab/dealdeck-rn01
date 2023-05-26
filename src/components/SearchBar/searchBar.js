import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Modal, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from '@react-native-community/blur';
import CustomButton from '../Button';

const SearchBar = ({ pickerItems }) => {
    const [isFocused, setFocused] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');


    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconContainer} onPress={handleFocus}>
                <Icon name="search1" size={24} color="#00c0ff" style={{ marginRight: 15, marginTop: 4 }} />
            </TouchableOpacity>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {isFocused && (
                <TouchableOpacity style={styles.filterIconContainer} onPress={handleOpenModal}>
                    <Icon name="filter" size={24} color="#00c0ff" style={{ marginRight: 15, marginTop: 4 }} />
                </TouchableOpacity>
            )}
            <Modal visible={isModalVisible} transparent={true} onRequestClose={handleCloseModal}>
                <BlurView style={styles.blurContainer} blurType="light" blurAmount={4} reducedTransparencyFallbackColor="white">
                    <View style={{ width: '90%', height: '35%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'  }} >
                        <Text style={{ fontSize: 25, fontWeight: 600, width: '90%', }} >Apply Filters</Text>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }} >
                            <Text style={{ fontWeight: 400, fontSize: 23 }} > Categories : </Text>
                            <Picker
                                style={{ width: '55%' }}
                                selectedValue={selectedCategory}
                                onValueChange={handleCategoryChange}>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }} >
                            <CustomButton title='Cancel' buttonStyle={{ padding: 10, width: '45%', backgroundColor: 'red' }} onPress={handleCloseModal} />
                            <CustomButton title='Apply' buttonStyle={{ padding: 10, width: '45%' }} onPress={handleCategoryChange} />
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 10,
        margin: 5,
        marginTop: 0
    },
    iconContainer: {
        padding: 8,
    },
    filterIconContainer: {
        padding: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    blurContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


});

export default SearchBar;
