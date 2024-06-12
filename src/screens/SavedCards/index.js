import { observer } from "mobx-react";
import React, { useState } from "react";
import { Alert, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from "../../components/TextInput";
import { CCImages, creditCardValidator } from "../../utils";
import { CustomDatePicker } from "../../components/DatePicker";
import CustomButton from "../../components/Button";

export const SavedCards = observer(({ navigation }) => {
    const { auth } = useStore();
    const { savedCards } = auth?.profileData;
    const [modalVisible, setModalVisible] = useState(false);
    const [ccIcon, setCcIcon] = useState(null);
    const [date, setDate] = useState(new Date());
    const [cvv, setCVV] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');

    const onChangeCC = (text) => {
        setCreditCardNumber(text);
        const res = creditCardValidator(text);
        if (text.length >= 13 && text.length <= 16) {
            for (let item in CCImages) {
                CCImages[item].name === res ? setCcIcon(CCImages[item].image) : null;
            }
        } else {
            setCcIcon(null);
        }
    };

    const handleDate = (date) => {
        setDate(date);
    };

    const handleCVV = (text) => {
        if (text.length <= 3) {
            setCVV(text);
        }
    };

    const creditCardValidation = () => {
        const res = creditCardValidator(creditCardNumber);
        if (!res || !cvv || !creditCardNumber) {
            Alert.alert("Invalid details");
            return false;
        }
        return res;
    };

    const handleAddCard = async () => {
        const cardType = creditCardValidation();
        const getExpirationYear = date.getFullYear();
        const getExpirationMonth = date.getMonth();

        if (cardType !== false) {
            const newCard = {
                cardNumber: creditCardNumber,
                cardLastFourDigits: creditCardNumber.slice(-4),
                cardType: cardType,
                expirationMonth: getExpirationMonth,
                expirationYear: getExpirationYear,
                securityCode: cvv
            };
            // const res = await auth.addCardToUserProfile(newCard);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader showCart titleOnHead={'My Cards'} navigation={navigation} />

            {savedCards && savedCards?.length > 0 ? (
                <>
                    <View style={styles.AddCardView}>
                        <MaterialIcon name="add" size={40} />
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={styles.addNewCardText}>Add a new card</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.noccView}>
                    {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
                    <Image source={require('../../assets/images/nocc.png')} style={styles.nocc} />
                    {/* </TouchableOpacity> */}
                    <CustomButton
                        title={'Add Credit Card'}
                        buttonStyle={{ padding: 8, paddingHorizontal: 50 }}
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
                        <Text style={styles.modalTitle}>Add New Card</Text>
                        <CustomTextInput
                            placeholder={'Card Number'}
                            label={'Card Number'}
                            labelStyle={styles.labelStyle}
                            style={styles.inputStyle}
                            onChangeText={onChangeCC}
                            maxLength={16}
                            keyboardType="numeric"
                        />
                        {ccIcon && <Image source={ccIcon} style={styles.ccIcon} />}
                        <View style={styles.expiryAndCvv}>
                            <View style={styles.expiryDateAndPickerView}>
                                <Text style={styles.expiryDateText}>Expiry Date:</Text>
                                <View style={styles.inputStyle}>
                                    <CustomDatePicker confirmDate={handleDate} />
                                </View>
                            </View>
                            <View style={styles.cvvContainer}>
                                <Text style={styles.expiryDateText}>CVV:</Text>
                                <CustomTextInput
                                    placeholder={'CVV'}
                                    style={[styles.inputStyle, { width: 80 }]}
                                    maxLength={3}
                                    onChangeText={handleCVV}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={styles.modalBtnView}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddCard}>
                                <Text style={styles.modalButtonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
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
        width: 200,
        resizeMode: 'contain',
    },
    noccView: {
        alignItems: 'center',
        alignContent: 'center',
        paddingVertical: 40,
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
    },
    modalBtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
    },
    expiryAndCvv: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: "center",
    },
    expiryDateText: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 8,
    },
    expiryDateAndPickerView: {
        flexDirection: 'column',
        alignItems: "flex-start",
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
        fontWeight: '700',
        marginBottom: 4,
        fontSize:16
    },
    ccIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
        position: 'absolute',
        top: 50,
        right: 16,
    },
    cvvContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    addButton: {
        backgroundColor: '#2196F3',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});