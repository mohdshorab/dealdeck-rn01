import React, { useState } from "react";
import {
    SafeAreaView, Text, ScrollView, TouchableOpacity, View, Image, StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import CustomTextInput from "../../components/TextInput";
import { useStore } from "../../store";
import CustomButton from "../../components/Button";
import ImagePickerComponent from "../../components/ImagePicker";
import GooglePNG from '../../assets/images/GooglePNG.png';
import PhonePNG from '../../assets/images/PhonePNG.png';
import ShowToast from "../../components/Toast/toast";
import CustomModal from "../../components/Modal/customModal";
import CustomHeader from "../../components/Header";
import CustomLoader from "../../components/CustomLoader";

const SignUpForm = ({ navigation }) => {
    const { auth } = useStore();
    const [showLoader, setShowLoader] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: '',
        passwordAgain: '',
        firstName: '',
        lastName: '',
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageURI, setSelectedImageURI] = useState(null);
    const [warnings, setWarnings] = useState({
        showEmailEmptyWarning: false,
        showFnameEmptyWarning: false,
        passDontMatchWarning: false,
        showPhoneWarning: false,
        showPasswordWarning: false,
    });
    const [showRePass, setShowRePass] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value,
        }));
        setWarnings(prevState => ({
            ...prevState,
            [`${field}Warning`]: false,
        }));
    };

    const handleImageSelect = (imageURI) => {
        setSelectedImageURI(imageURI);
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const inputValidation = async () => {
        const { firstName, email, phone, password, passwordAgain, lastName } = formData;
        const isFnameEmpty = firstName.trim() === '';
        const isPhoneEmpty = phone.trim() === '';
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';

        setWarnings({
            showEmailEmptyWarning: isEmailEmpty,
            showPasswordWarning: isPasswordEmpty,
            showFnameEmptyWarning: isFnameEmpty,
            showPhoneWarning: isPhoneEmpty,
        });

        const fnameReg = /^[A-Za-z ]{1,10}$/;
        const mailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passReg = /^(?=.*[0-9a-zA-Z!@#$%^&*()-_=+~])[0-9a-zA-Z!@#$%^&*()-_=+~]{8,12}$/;
        const phoneReg = /^(?!0)\d{10}$/;
        const doesPassMatch = (password === passwordAgain);
        const isFnameValid = fnameReg.test(firstName);
        const isPhoneValid = phoneReg.test(phone);
        const isValidEmail = mailReg.test(email);
        const isValidPassword = passReg.test(password);

        if (!selectedImageURI) {
            ShowToast({ type: "error", text1: "Please upload your image.", color: "red" });
        } else if (!isFnameEmpty && !isFnameValid) {
            ShowToast({ type: "error", text1: "Invalid name.", color: "red" });
        } else if (!isEmailEmpty && !isValidEmail) {
            ShowToast({ type: "error", text1: "Invalid email.", color: "red" });
        } else if (!isPhoneEmpty && !isPhoneValid) {
            ShowToast({ type: "error", text1: "Invalid phone number.", color: "red" });
        } else if (!isPasswordEmpty && !isValidPassword) {
            ShowToast({ type: "error", text1: "Password must be at least 8 characters long", color: "red" });
        } else if (!doesPassMatch) {
            setWarnings(prevState => ({
                ...prevState,
                passDontMatchWarning: true,
            }));
        } else if (isValidEmail && isValidPassword && isFnameValid && isPhoneValid && doesPassMatch) {
            setShowLoader(true);
            if (lastName == null || '') lastName == 'NA';
            const res = await auth.registerUser({ selectedImageURI, firstName, lastName, email, phone, passwordAgain });
            if (res?.status === true) {
                setShowLoader(false)
                toggleModal();
            } else {
                setShowLoader(false)
                ShowToast({ type: "error", text1: res?.message, color: "red" });
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader titleOnHead={'Register Yourself'} navigation={navigation} titleStyle={{ color: '#00C0FF' }} />
            <CustomLoader show={showLoader} />
            <ScrollView scrollEnabled={false}>
                <View style={styles.body}>
                    <Text style={styles.knowAboutText}>Let us know about yourself.</Text>
                    <View style={styles.imagePicker}>
                        <Text style={styles.uploadImageText}>Upload your image</Text>
                        <ImagePickerComponent onSelectImage={handleImageSelect} />
                    </View>
                    {warnings.showFnameEmptyWarning && (
                        <Text style={styles.warningText}>First name can't be empty</Text>
                    )}
                    <View style={!warnings.showFnameEmptyWarning ? styles.userNameView : [styles.userNameView, { marginTop: 5 }]}>
                        <View style={!warnings.showEmailEmptyWarning ? styles.firstNameView : [styles.firstNameView, { marginBottom: 10 }]}>
                            <Icon name="user" size={24} color="#00c0ff" style={styles.icon} />
                            <CustomTextInput
                                backgroundColor={"#fff"}
                                placeholder={"first name"}
                                value={formData.firstName}
                                onChangeText={(text) => handleInputChange('firstName', text)}
                                style={styles.customTextInput}
                            />
                        </View>
                        <View style={styles.spacing} />
                        <View style={!warnings.showEmailEmptyWarning ? styles.lastNameView : [styles.lastNameView, { marginBottom: 10 }]}>
                            <CustomTextInput
                                backgroundColor={"#fff"}
                                placeholder={"last name (optional)"}
                                value={formData.lastName}
                                onChangeText={(text) => handleInputChange('lastName', text)}
                                style={styles.customTextInput}
                            />
                        </View>
                    </View>
                    {warnings.showEmailEmptyWarning && <Text style={styles.warningText}>Email can't be empty</Text>}
                    <View style={styles.emailView}>
                        <Icon name="mail" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"email"}
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            keyboardType={'email-address'}
                            style={styles.customTextInput}
                        />
                    </View>
                    {warnings.showPhoneWarning && <Text style={styles.warningText}>Phone can't be empty.</Text>}
                    <View style={styles.phoneView}>
                        <Icon name="phone" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"mobile"}
                            value={formData.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            keyboardType={'number-pad'}
                            style={styles.customTextInput}
                        />
                    </View>
                    {warnings.showPasswordWarning && (
                        <Text style={styles.warningText}>Password can't be empty</Text>
                    )}
                    {warnings.passDontMatchWarning && (<Text style={styles.warningText}>Password isn't matching.</Text>)}
                    <View style={styles.passView}>
                        <Icon name="lock" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"password"}
                            value={formData.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                            secureTextEntry={true}
                            style={styles.customTextInput}
                        />
                    </View>
                    {!formData.password ? <View /> :
                        <View style={styles.passAgain}>
                            <Icon name="lock" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                            <CustomTextInput
                                backgroundColor={"#fff"}
                                placeholder={"Re-enter to verify your password."}
                                value={formData.passwordAgain}
                                onChangeText={(text) => handleInputChange('passwordAgain', text)}
                                secureTextEntry={!showRePass}
                                style={styles.customTextInput}
                            />
                            <TouchableOpacity onPress={() => setShowRePass(!showRePass)}>
                                <Icon name={showRePass ? "eye" : "eye-with-line"} color="#808080" style={styles.eyeIcon} size={17} />
                            </TouchableOpacity>
                        </View>
                    }
                    <CustomButton
                        title={"Register"}
                        onPress={inputValidation}
                        buttonStyle={styles.customButton}
                        textStyle={styles.customButtonText}
                    />
                    <Text style={styles.signUpWithText}>Or Sign-up with...</Text>
                    <View style={styles.googleMobileIcon}>
                        <TouchableOpacity style={styles.googlePhoneTouchable}>
                            <Image source={GooglePNG} style={styles.googlePhonePNG} />
                            <Text style={{ color: 'black' }} >Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.googlePhoneTouchable}>
                            <Image source={PhonePNG} style={styles.googlePhonePNG} />
                            <Text style={styles.mobileText}>Mobile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomRowView}>
                        <Text style={styles.alreadyRegisteredText}>Already registered, </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={styles.loginText}>
                                Login here.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <CustomModal
                title="Registration successful!"
                content="Registration completed successfully. Please proceed to login."
                btnText="Go to login"
                visible={modalVisible}
                onClose={toggleModal}
                oneBtn={true}
                success={true}
                proceedFurther={() => navigation.goBack()}
            />
        </SafeAreaView>
    );
};

export default SignUpForm;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
    thinLeftIcon: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 25,
    },
    body: {
        paddingHorizontal: 20,
        marginVertical: 35
    },
    signUpText: {
        fontSize: 28,
        fontWeight: '500',
        color: '#00C0FF',
        marginBottom: 5
    },
    knowAboutText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#00C0FF',
        marginBottom: 20,
        alignSelf: 'center'
    },
    imagePicker: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginTop: 20
    },
    uploadImageText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#00C0FF',
        marginBottom: 5
    },
    userNameView: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 10,
        marginTop: 25
    },
    firstNameView: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 15,
        flex: 1,
    },
    icon: {
        marginRight: 15,
        marginTop: 1
    },
    lastNameView: {
        flexDirection: 'row',
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 15,
        flex: 1,
    },
    emailView: {
        flexDirection: 'row',
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        marginBottom: 15
    },
    phoneView: {
        flexDirection: 'row',
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 15
    },
    passView: {
        flexDirection: 'row',
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 15
    },
    passAgain: {
        flexDirection: 'row',
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 5
    },
    signUpWithText: {
        textAlign: "center",
        marginBottom: 10,
        marginTop: 10,
        color: 'black'
    },
    googleMobileIcon: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    googlePhoneTouchable: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        height: 150,
        width: '40%',
        alignItems: 'center'
    },
    googlePhonePNG: {
        height: 80,
        width: 80,
        resizeMode: "cover",
        marginVertical: 10
    },
    bottomRowView: {
        alignSelf: "center",
        flexDirection: 'row',
        marginTop: 50,
    },
    warningText: {
        flex: 1,
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    customTextInput: {
        flex: 1,
        paddingVertical: 0,
    },
    spacing: {
        width: 10,
    },
    eyeIcon: {
        marginRight: 10,
    },
    customButton: {
        height: 30,
        paddingLeft: 10,
        marginTop: 15,
    },
    customButtonText: {
        fontSize: 18,
    },
    mobileText: {
        paddingTop: 10,
        color: 'black'
    },
    alreadyRegisteredText: {
        fontWeight: '300',
        fontSize: 15,
        color: 'black'
    },
    loginText: {
        color: "#00C0FF",
        fontSize: 15,
    },
});
