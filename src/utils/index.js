import DeviceInfo from 'react-native-device-info';

export const generateDeviceId = () => {
    const imei = DeviceInfo.getUniqueId(); // Get IMEI or UID for iOS devices
    const brand = DeviceInfo.getBrand(); // Get device brand
    const model = DeviceInfo.getModel(); // Get device model

    // Combine IMEI/UID, brand, and model to create a unique device ID
    const deviceId = `${imei}_${brand}_${model}`;

    return deviceId;
};