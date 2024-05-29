import React, { useState } from 'react';
import {
    View, Image, StyleSheet,
    Text,
    Modal,
    TouchableOpacity
} from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import CustomHeader from '../../components/Header';
import forgotpass from '../../assets/images/forgotpass.png';
import CustomTextInput from '../../components/TextInput';
import { getFontScale } from 'react-native-device-info';
import CustomButton from '../../components/Button';

const Forgotpass = observer(({ navigation }) => {
    // const {auth} = useStore();
    const [modalVisible, setModalVisible] = useState(false);

    const { auth } = useStore();

    const verifyMail = async () => {
        setModalVisible(true)
    }

    return (
        <View style={styles.mainContainer}>
            <CustomHeader navigation={navigation} hideNotification titleOnHead={'Forgot Password'} />
            <View>
                <View style={styles.logoContainer}>
                    <Image style={styles.dealDeackLogo} source={forgotpass} />
                </View>
                <View style={{ width: '95%', alignSelf: 'center' }} >
                    <CustomTextInput
                        placeholder={'Enter your email'}
                        keyboardType={'email-address'}
                        label={'Email'}
                        placeholderTextColor={'#4a4b4d'}
                        style={{ borderWidth: 1, padding: 5, fontSize: 14, marginVertical: 10, height: 40 }}
                        labelStyle={{ color: '#4a4b4d', fontSize: 16 }}
                    />
                    <CustomButton
                        title={'Verify'}
                        buttonStyle={{ borderRadius: 0, height: 30, padding: 5 }}
                        onPress={() => verifyMail()}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View
                    style={{
                        height: '50%',
                        marginTop: 'auto',
                        backgroundColor: 'blue'
                    }}>
                    <View style={styles.footer}>
                        <Text style={styles.headerText}>This is Half Modal</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Text style={styles.addButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
});

export default Forgotpass;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 25
    },
    dealDeackLogo: {
        height: 250,
        width: 200,
        resizeMode: "cover",
        alignSelf: "center",
    }, enterMailText: {
        fontWeight: 700
    }

});
