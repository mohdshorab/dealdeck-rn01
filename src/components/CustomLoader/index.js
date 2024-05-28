import React from 'react';
import {
    StyleSheet, View, Modal, ActivityIndicator, Platform
} from 'react-native';

const CustomLoader = (props) => {
    const { show } = props;
    return (
        Platform.OS === 'android' ? (
            <Modal
                transparent
                animationType="none"
                visible={!!show}
                onRequestClose={() => {
                    console.log('close modal');
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={!!show}
                            size="large"
                            color='#00C0FF' />
                    </View>
                </View>
            </Modal>
        ) : (
            show
                ? (
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color='#00C0FF' />
                    </View>
                ) : null
        )

    );
};

export default CustomLoader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 99
    },
});
