import React, { useState, } from "react";
import {
    Image, StyleSheet, TouchableOpacity, View, Text, KeyboardAvoidingView, ScrollView
} from "react-native";
import CustomTextInput from "../../components/TextInput";
import dealdeck_logo from '../../assets/images/dealdeck_logo.png';
import CustomButton from "../../components/Button";
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";
import GooglePNG from '../../assets/images/GooglePNG.png';
import PhonePNG from '../../assets/images/PhonePNG.png';
import ShowToast from "../../components/Toast/toast";
import { useStore } from "../../store";
import { observer } from 'mobx-react';

const LogInForm = observer(({ navigation }) => {
    const { Auth } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showEmailWarning, setShowEmailWarning] = useState(false);
    const [showPasswordWarning, setShowPasswordWarning] = useState(false);

    const handleEmailChange = (text) => {
        setEmail(text);
        setShowEmailWarning(false); // Update showEmailWarning to false on input change
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setShowPasswordWarning(false); // Update showEmailWarning to false on input change
    };

    const inputValidation = async () => {
        const isEmailEmpty = email.trim() === '';
        const isPasswordEmpty = password.trim() === '';
        setShowEmailWarning(isEmailEmpty);
        setShowPasswordWarning(isPasswordEmpty);
        const mailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passReg = /^(?=.*[0-9a-zA-Z!@#$%^&*()-_=+~])[0-9a-zA-Z!@#$%^&*()-_=+~]{8,12}$/;
        const isValidEmail = mailReg.test(email);
        const isValidPassword = passReg.test(password);
        if (!isEmailEmpty && !isPasswordEmpty && !isValidEmail) {
            ShowToast({ type: "error", text1: "Inavlid email", color: "red" })
        } else if (!showPasswordWarning && !isEmailEmpty && !isValidPassword) {
            ShowToast({ type: "error", text1: "Password must be at least 8 characters long", color: "red" })
        } else if (!showEmailWarning && !showPasswordWarning && isValidEmail && isValidPassword) {
            const res = await Auth.login({ email, password });
            if (res?.status === "success") {
                console.log('res', res);
                navigation.navigate('mainScreen')
            } else {
                ShowToast({ type: "error", text1: res?.message, color: "red" })
            }
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ alignItems: "center", marginTop: 25 }} >
                    <Image style={styles.dealDeackLogo} source={dealdeck_logo} />
                </View>
                <View style={{ paddingHorizontal: 25 }} >
                    <Text style={{ fontSize: 28, fontWeight: '500', color: '#00C0FF', marginBottom: 30 }} >Login</Text>
                    {showEmailWarning && (
                        <Text style={styles.warningText}>Email is empty</Text>
                    )}
                    <View style={{ flexDirection: 'row', borderBottomColor: "#00C0FF", borderBottomWidth: 1, paddingBottom: 0, marginBottom: 28 }} >
                        <Icon name="mail" size={24} color="#00c0ff" style={{ marginRight: 15, marginTop: 4 }} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"e-mail"}
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType={'email-address'}
                            style={{ flex: 1, paddingVertical: 0, }}
                        />
                    </View>
                    {showPasswordWarning && (
                        <Text style={styles.warningText}>Password is empty</Text>
                    )}
                    <View style={{ flexDirection: 'row', borderBottomColor: "#00C0FF", borderBottomWidth: 1, paddingBottom: 0, marginBottom: 5 }} >
                        <Icon name="lock" size={24} color="#00c0ff" style={{ marginRight: 15, marginTop: 4 }} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"password"}
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={!Auth.showPassword ? true : false}
                            style={{ flex: 1, paddingVertical: 0, }}
                        />
                        <TouchableOpacity onPress={() => Auth.showPassword ? Auth.willShowPassword(false) : Auth.willShowPassword(true)}>
                            {Auth.showPassword ? <Icon name="eye" color="#808080" style={{ marginRight: 10 }} size={17} />
                                : <Icon name="eye-with-line" color="#808080" style={{ marginRight: 10 }} size={17} />}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity >
                        <Text style={{ color: '#000', fontWeight: '500', alignSelf: "flex-end" }} >Forgot password?</Text>
                    </TouchableOpacity>
                    <CustomButton
                        title={"Log-In"}
                        onPress={() => inputValidation()}
                        buttonStyle={{ height: 30, paddingleft: 10, marginTop: 15 }}
                        textStyle={{ fontSize: 18, }}
                    />
                    <Text style={{ textAlign: "center", marginBottom: 30, marginTop: 30 }} >Or Login with...</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }} >
                        <TouchableOpacity style={{ borderColor: '#ddd', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10 }} >
                            <Image source={GooglePNG} style={{ height: 40, width: 40, resizeMode: "cover" }} />
                            <Text>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderColor: '#ddd', borderWidth: 2, borderRadius: 10, paddingHorizontal: 30, paddingVertical: 10 }} >
                            <Image source={PhonePNG} style={{ height: 40, width: 40, resizeMode: "cover" }} />
                            <Text style={{ paddingTop: 10 }} >Mobile</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: "center", flexDirection: 'row', marginTop: 80 }}>
                        <Text style={{ fontWeight: 300, fontSize: 15 }} >New to the App?  </Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('signUpForm')
                        }} >
                            <Text style={{ color: "#00C0FF", fontSize: 15 }} >
                                Register Yourself Here.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    dealDeackLogo: {
        height: 200,
        width: 200,
        resizeMode: "cover",
        alignSelf: "center"
    },

    warningText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});




export default LogInForm;