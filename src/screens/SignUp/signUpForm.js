import React, { useState, } from "react";
import {
    SafeAreaView, Text, ScrollView, TouchableOpacity, View, Image, StyleSheet,
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


const SignUpForm = ({ navigation }) => {
    const { Auth } = useStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageURI, setSelectedImageURI] = useState(null);
    const [showEmailEmptyWarning, setShowEmailEmptyWarning] = useState(false);
    const [showFnameEmptyWarning, setShowFnameWarning] = useState(false);
    const [passDontMatchWarning, setPassDontMatchWarning] = useState(false);
    const [showPhoneWarning, setShowPhoneWarning] = useState(false);
    const [showPasswordWarning, setShowPasswordWarning] = useState(false);
    const [showRePass, setshowRePass] = useState(false)

    const handleEmailChange = (text) => {
        setEmail(text);
        setShowEmailEmptyWarning(false); // Update showEmailWarning to false on input change
    };

    const handleFirstNameChange = (text) => {
        setFirstName(text);
        setShowFnameWarning(false);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setShowPasswordWarning(false); // Update showEmailWarning to false on input change
    };

    const handlePasswordAgainChange = (text) => {
        setPasswordAgain(text);
        if (password === passwordAgain) { setPassDontMatchWarning(false) };
    };

    const handlePhoneChange = (text) => {
        setPhone(text);
        setShowPhoneWarning(false);
    };


    const handleImageSelect = (imageURI) => {
        setSelectedImageURI(imageURI);
    };

    const toggleModal = () => {
        setModalVisible(true);
    };

    const inputValidation = async () => {
        const isFnameEmpty = firstName.trim() === '';
        const isPhoneEmpty = phone.trim() === '';
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';
        setShowEmailEmptyWarning(isEmailEmpty);
        setShowPasswordWarning(isPasswordEmpty);
        setShowFnameWarning(isFnameEmpty);
        setShowPhoneWarning(isPhoneEmpty);
        const fnameReg = /^[A-Za-z ]{1,10}$/;
        const mailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passReg = /^(?=.*[0-9a-zA-Z!@#$%^&*()-_=+~])[0-9a-zA-Z!@#$%^&*()-_=+~]{8,12}$/;
        const phoneReg = /^(?!0)\d{10}$/;
        const doesPassMatch = (password === passwordAgain)
        const isFnameValid = fnameReg.test(firstName);
        const isPhoneValid = phoneReg.test(phone);
        const isValidEmail = mailReg.test(email);
        const isValidPassword = passReg.test(password);
        if (!selectedImageURI) { ShowToast({ type: "error", text1: "Please upload you image.", color: "red" }) }
        else if (!isFnameEmpty && !isFnameValid) { ShowToast({ type: "error", text1: "Inavlid name.", color: "red" }) }
        else if (!isEmailEmpty && !isValidEmail) { ShowToast({ type: "error", text1: "Inavlid email.", color: "red" }) }
        else if (!isPhoneEmpty && !isPhoneValid) { ShowToast({ type: "error", text1: "Inavlid phone number.", color: "red" }) }
        else if (!isPasswordEmpty && !isValidPassword) { ShowToast({ type: "error", text1: "Password must be at least 8 characters long", color: "red" }) }
        else if (!isEmailEmpty && !isPasswordEmpty && !isFnameEmpty && !isPhoneEmpty && isValidEmail && isValidPassword && isFnameValid && isPhoneValid && doesPassMatch) {
            const res = await Auth.registerUser({ selectedImageURI, firstName, lastName, email, phone, passwordAgain });
            if (res?.status === "success") {
                toggleModal();
            } else ShowToast({ type: "error", text1: res?.message, color: "red" })

        }
    }

    return (
        <SafeAreaView style={styles.container} >
            <ScrollView scrollEnabled={false} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="chevron-thin-left" size={25} style={styles.thinLeftIcon} />
                </TouchableOpacity>
                <View style={styles.body} >
                    <Text style={styles.signUpText} >SIGN UP</Text>
                    <Text style={styles.knowAboutText} >Let us know about yourself.</Text>
                    <View style={styles.imagePicker} >
                        <Text style={styles.uploadImageText}>Upload your image</Text>
                        <ImagePickerComponent onSelectImage={handleImageSelect} />
                    </View>
                    {showFnameEmptyWarning && (
                        <Text style={styles.warningText}>First name can't be empty</Text>
                    )}
                    <View style={!showFnameEmptyWarning ? styles.userNameView : [styles.userNameView, { marginTop: 5 }]} >
                        <View style={!showEmailEmptyWarning ? styles.firstNameView : [styles.firstNameView, { marginBottom: 10 }]} >
                            <Icon name="user" size={24} color="#00c0ff" style={styles.icon} />
                            <CustomTextInput
                                backgroundColor={"#fff"}
                                placeholder={"First name"}
                                value={firstName}
                                onChangeText={handleFirstNameChange}
                                style={{ flex: 1, paddingVertical: 0, }}
                            />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={!showEmailEmptyWarning ? styles.lastNameView : [styles.lastNameView, { marginBottom: 10 }]} >
                            <CustomTextInput
                                backgroundColor={"#fff"}
                                placeholder={"Last name (optional)"}
                                value={lastName}
                                onChangeText={setLastName}
                                style={{ flex: 1, paddingVertical: 0, }}
                            />
                        </View>
                    </View>
                    {showEmailEmptyWarning && <Text style={styles.warningText}>Email can't be empty</Text>}
                    <View style={styles.emailView} >
                        <Icon name="mail" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"e-mail"}
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType={'email-address'}
                            style={{ flex: 1, paddingVertical: 0, }}
                        />
                    </View>
                    {showPhoneWarning && <Text style={styles.warningText}>Phone can't be empty.</Text>}
                    <View style={styles.phoneView} >
                        <Icon name="phone" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"Mobile"}
                            value={phone}
                            onChangeText={handlePhoneChange}
                            keyboardType={'number-pad'}
                            style={{ flex: 1, paddingVertical: 0, }}
                        />
                    </View>


                    {showPasswordWarning && (
                        <Text style={styles.warningText}>Password can't be empty</Text>
                    )}
                    {passDontMatchWarning && (<Text style={styles.warningText}>Password isn't matching.</Text>)}
                    <View style={styles.passView} >
                        <Icon name="lock" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"password"}
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={true}
                            style={{ flex: 1, paddingVertical: 0, }}
                        />
                    </View>
                    {passDontMatchWarning &&
                        <Text style={styles.warningText}>Password can't be empty</Text>
                    }
                    {!password ? <View /> :
                        <View style={styles.passAgain} >
                            <Icon name="lock" size={24} color="#00c0ff" style={[styles.icon, { marginTop: 4 }]} />
                            <CustomTextInput
                                backgroundColor={"#fff"}
                                placeholder={"Re-enter to verify your password."}
                                value={passwordAgain}
                                onChangeText={handlePasswordAgainChange}
                                secureTextEntry={!showRePass ? true : false}
                                style={{ flex: 1, paddingVertical: 0, }}
                            />
                            <TouchableOpacity onPress={() => showRePass ? setshowRePass(false) : setshowRePass(true)}>
                                {showRePass ? <Icon name="eye" color="#808080" style={{ marginRight: 10 }} size={17} />
                                    : <Icon name="eye-with-line" color="#808080" style={{ marginRight: 10 }} size={17} />}
                            </TouchableOpacity>
                        </View>
                    }


                    <CustomButton
                        title={"Sign Up"}
                        onPress={() => inputValidation()}
                        buttonStyle={{ height: 30, paddingleft: 10, marginTop: 15 }}
                        textStyle={{ fontSize: 18, }}
                    />
                    <Text style={styles.signUpWithText} >Or Sign-up with...</Text>
                    <View style={styles.googleMobileIcon} >
                        <TouchableOpacity style={styles.googlePhoneTouchable} >
                            <Image source={GooglePNG} style={styles.googlePhonePNG} />
                            <Text>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.googlePhoneTouchable} >
                            <Image source={PhonePNG} style={styles.googlePhonePNG} />
                            <Text style={{ paddingTop: 10 }} >Mobile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomRowView}>
                        <Text style={{ fontWeight: 300, fontSize: 15 }} >Already registered, </Text>
                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('logInForm')
                            navigation.goBack();

                        }} >
                            <Text style={{ color: "#00C0FF", fontSize: 15 }} >
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
    )
}

export default SignUpForm;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
    thinLeftIcon: {
        marginLeft: 10,
        marginTop: 0,
        marginBottom: 25
    },
    body: {
        paddingHorizontal: 25,
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
        marginBottom: 20
    },
    imagePicker: {
        flexDirection: "row",
        alignItems: "center",
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
        marginTop: 20
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
        paddingBottom: 0,
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
        marginTop: 10
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
        paddingVertical: 10
    },
    googlePhonePNG: {
        height: 40,
        width: 40,
        resizeMode: "cover"
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


})