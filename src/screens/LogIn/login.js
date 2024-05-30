import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Alert
} from "react-native";
import CustomTextInput from "../../components/TextInput";
import dealdeck_logo from '../../assets/images/dealdeck_logo.png';
import CustomButton from "../../components/Button";
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from "react-native-safe-area-context";
import GooglePNG from '../../assets/images/GooglePNG.png';
import PhonePNG from '../../assets/images/PhonePNG.png';
import { useStore } from "../../store";
import { observer } from 'mobx-react';
import ShowToast from "../../components/Toast/toast";

const LogInForm = observer(({ navigation }) => {
    const { auth, products } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailWarning, setEmailWarning] = useState('');
    const [passwordWarning, setPasswordWarning] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailWarning('');
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordWarning('');
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && !/\s/.test(email);
    };

    const inputValidation = async () => {
        // let valid = true;

        // if (!email) {
        //     setEmailWarning('Email is empty');
        //     valid = false;
        // } else if (!validateEmail(email)) {
        //     setEmailWarning('Please enter a correct email');
        //     valid = false;
        // }

        // if (!password) {
        //     setPasswordWarning('Password is empty');
        //     valid = false;
        // }

        // if (valid) {
        //     const res = await auth.login({ email, password })
        //     if (res?.status == 'success') {
                await products.init()
                navigation.navigate('Home')
            // }
        // }
    };

    const googleSignIn = async () => {
        const res = await auth.googleSignIn();
        if (res.message == 'success') {
            await products.init()
            navigation.navigate('Home')
        }
        else ShowToast({ type: "error", text1: res.message, color: "red" });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.logoContainer}>
                    <Image style={styles.dealDeackLogo} source={dealdeck_logo} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.loginText}>Login</Text>
                    {emailWarning ? (
                        <Text style={styles.warningText}>{emailWarning}</Text>
                    ) : null}
                    <View style={styles.inputContainer}>
                        <Icon name="mail" size={24} color="#00c0ff" style={styles.inputIcon} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"email"}
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType={'email-address'}
                            style={styles.inputField}
                        />
                    </View>
                    {passwordWarning ? (
                        <Text style={styles.warningText}>{passwordWarning}</Text>
                    ) : null}
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={24} color="#00c0ff" style={styles.inputIcon} />
                        <CustomTextInput
                            backgroundColor={"#fff"}
                            placeholder={"password"}
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry={!auth.showPassword}
                            style={styles.inputField}
                        />
                        <TouchableOpacity onPress={() => auth.willShowPassword(!auth.showPassword)}>
                            {auth.showPassword ? (
                                <Icon name="eye" color="#808080" style={styles.eyeIcon} size={17} />
                            ) : (
                                <Icon name="eye-with-line" color="#808080" style={styles.eyeIcon} size={17} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Forgotpass')} >
                        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                    <CustomButton
                        title={"LogIn"}
                        onPress={inputValidation}
                        buttonStyle={styles.loginButton}
                        textStyle={styles.loginButtonText}
                    />
                    <Text style={styles.orText}>Or Login with...</Text>
                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity style={styles.socialLoginButton} onPress={() => googleSignIn()} >
                            <Image source={GooglePNG} style={styles.socialLoginIcon} />
                            <Text style={{ color: 'black' }} >Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialLoginButton} onPress={() => navigation.navigate('Home')}>
                            <Image source={PhonePNG} style={styles.socialLoginIcon} />
                            <Text style={styles.mobileText}>Mobile</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>New to the App?  </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signUpForm')}>
                            <Text style={styles.registerLink}>Register Yourself Here.</Text>
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
    logoContainer: {
        alignItems: "center",
        marginTop: 25
    },
    dealDeackLogo: {
        height: 200,
        width: 200,
        resizeMode: "cover",
        alignSelf: "center"
    },
    formContainer: {
        paddingHorizontal: 25
    },
    loginText: {
        fontSize: 28,
        fontWeight: '500',
        color: '#00C0FF',
        marginBottom: 30
    },
    warningText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomColor: "#00C0FF",
        borderBottomWidth: 1,
        paddingBottom: 0,
        marginBottom: 28
    },
    inputIcon: {
        marginRight: 15,
        marginTop: 4
    },
    inputField: {
        flex: 1,
        paddingVertical: 0,
        color: '#4a4b4d'
    },
    eyeIcon: {
        marginRight: 10
    },
    forgotPasswordText: {
        color: '#4a4b4d',
        fontWeight: '500',
        alignSelf: "flex-end",
    },
    loginButton: {
        height: 30,
        paddingLeft: 10,
        marginTop: 15
    },
    loginButtonText: {
        fontSize: 18,
    },
    orText: {
        textAlign: "center",
        marginBottom: 30,
        marginTop: 30,
        color: '#4a4b4d',
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialLoginButton: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        height: 150,
        width: 150,
        alignItems: 'center'
    },
    socialLoginIcon: {
        height: 80,
        width: 80,
        resizeMode: "cover",
        marginVertical: 10
    },
    mobileText: {
        paddingTop: 10,
        color: 'black'
    },
    registerContainer: {
        alignSelf: "center",
        flexDirection: 'row',
        marginTop: 20
    },
    registerText: {
        fontWeight: '300',
        fontSize: 15,
        color: '#4a4b4d',
    },
    registerLink: {
        color: "#00C0FF",
        fontSize: 15
    }
});

export default LogInForm;
