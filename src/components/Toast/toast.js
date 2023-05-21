import React from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ShowToast = (props) => {
    return (
        Toast.show({
            type: props.type,
            text1: props?.text1,
            position: 'top',
            text1Style: { color: props?.color },
            autoHide: true,
            visibilityTime: 1500,
            topOffset: Platform.OS === 'ios' ? 40 : 0,
            onHide:props.onHide
        })

    )
}

export default ShowToast;