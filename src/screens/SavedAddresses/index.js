import { observer } from "mobx-react";
import React, { useState } from "react";
import { Alert, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from "../../components/TextInput";
import CustomButton from "../../components/Button";
import axios from "axios";

export const MyAddresses = observer(({ navigation }) => {
    const { auth } = useStore();
    const { savedAddresses } = auth?.profileData;
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');


    const handlePincodeChange = async (value) => {
        setPincode(value);
        try {
            if (value.length == 6) {
                const response = await axios.get(`https://api.zippopotam.us/in/${value}`);
                if (response.data.places.length > 0) {
                    const { state, city } = response.data.places[0];
                    setState(state);
                    setCity(city);
                } else {
                    setState('');
                    setCity('');
                }
            }
        } catch (error) {
            setState('');
            setCity('');
            console.error('Error fetching city and state:', error);
        }
    };

    const handleAddAddress = async () => {
        if (!name || !address || !pincode || !city || !state) {
            Alert.alert('Error', 'Please fill in all the required fields.');
            return;
        }

        const newAddress = { name, address, pincode, city, state };
        // const res = await auth.addCardToUserProfile(newCard);

        // Close the modal
        setModalVisible(false);
        // Reset the input fields
        setName('');
        setAddress('');
        setPincode('');
        setCity('');
        setState('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader showCart titleOnHead={'My Addresses'} navigation={navigation} />

            {savedAddresses && savedAddresses?.length > 0 ? (
                <>
                    <View style={styles.AddCardView}>
                        <MaterialIcon name="add" size={40} />
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.addNewCardText}>Add a new address.</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.noccView}>
                    <Image source={require('../../assets/images/noAddress.png')} style={styles.nocc} />
                    <Text style={[styles.addNewCardText, { fontSize: 18, marginBottom: 20 }]}>No address found!</Text>
                    <CustomButton
                        title={'Add Address'}
                        buttonStyle={{ padding: 10, paddingHorizontal: 50 }}
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <MaterialIcon name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Add New Address</Text>
                        <CustomTextInput
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.inputStyle}
                            labelStyle={styles.labelStyle}
                        />
                        <CustomTextInput
                            label="Address"
                            value={address}
                            onChangeText={setAddress}
                            multiline
                            style={styles.inputStyle}
                            labelStyle={styles.labelStyle}
                        />
                        <View style={styles.locationInputsContainer}>
                            <CustomTextInput
                                label="Phone"
                                value={phone}
                                onChangeText={setPhone}
                                style={[styles.inputStyle, styles.locationInput]}
                                labelStyle={styles.labelStyle}
                                maxLength={10}
                            />
                            <CustomTextInput
                                label="Pincode"
                                value={pincode}
                                onChangeText={handlePincodeChange}
                                keyboardType="number-pad"
                                style={[styles.inputStyle, styles.locationInput]}
                                labelStyle={styles.labelStyle}
                            />
                        </View>
                        <View style={styles.locationInputsContainer}>
                            <CustomTextInput
                                label="City"
                                value={city}
                                editable={false}
                                style={[styles.inputStyle, styles.locationInput]}
                                labelStyle={styles.labelStyle}
                            />
                            <CustomTextInput
                                label="State"
                                value={state}
                                editable={false}
                                style={[styles.inputStyle, styles.locationInput]}
                                labelStyle={styles.labelStyle}
                            />
                        </View>
                        <CustomButton
                            title="Add Address"
                            onPress={handleAddAddress}
                            buttonStyle={styles.addAddressButton}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    AddCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    addNewCardText: {
        fontSize: 20,
        fontWeight: '500',
    },
    nocc: {
        height: 300,
        width: 300,
    },
    noccView: {
        alignItems: 'center',
        alignContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 8,
        width: '100%',
        maxWidth: 500,
        elevation: 5,
        position: 'relative', 
        borderTopRightRadius:25,
        borderTopLeftRadius:25,

    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
    },
    labelStyle: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    locationInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    locationInput: {
        width: '30%',
    },
    addAddressButton: {
        marginTop: 24,
        paddingVertical:8
    },
    closeButton: {
        position: 'absolute', 
        top: 16, 
        right: 16,
        zIndex: 1,
    },
});