import React from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const ShowToast = (props) => {
    return (
        Toast.show({
            type: props.type,
            text1: props?.text1,
            position: props.position,
            text1Style: { color: props?.color },
            autoHide: true,
            visibilityTime: props?.visibilityTime ? props?.visibilityTime : 2000,
            topOffset: Platform.OS === 'ios' ? 50 : 0,
            onHide:props.onHide,
            bottomOffset: props?.bottomOffset ? props?.bottomOffset: null
        })

    )
}

export default ShowToast;