import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const CustomModal = ({title='', content,btnText, visible, onClose, oneBtn, success, danger, proceedFurther }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <BlurView
                style={styles.blurContainer}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            >
                <View style={styles.container}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={[styles.text, success && styles.successText, danger && styles.dangerText]}>
                            {content}
                        </Text>
                        <View style={styles.buttonContainer}>
                            {oneBtn ? (
                                <TouchableOpacity style={styles.button} onPress={proceedFurther} >
                                    <Text style={styles.buttonText}>{btnText}</Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <TouchableOpacity style={[styles.button,{backgroundColor:'red'}]}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={proceedFurther} >
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
    },
    successText: {
        color: 'green',
    },
    dangerText: {
        color: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#00C0FF',
        borderRadius: 4,
        marginLeft: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CustomModal;
