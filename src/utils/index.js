import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const generateDeviceId = () => {
  const imei = DeviceInfo.getUniqueId(); 
  const brand = DeviceInfo.getBrand(); 
  const model = DeviceInfo.getModel();

  // Combine IMEI/UID, brand, and model to create a unique device ID
  const deviceId = `${imei}_${brand}_${model}`;

  return deviceId;
};

export const searchTheProduct = async (text) => {
  try {
    fetch('https://dummyjson.com/products/search?q=phone')
      .then(res => res.json())
      .then(console.log);
  }
  catch (e) {
    console.error('Error found while searching', e)
  }
}

export const creditCardValidator = (text) => {
  const firstDigit = text.slice(0, 1)
  const firstTwoDigits = text.slice(0, 2)
  const firstFourDigit = text.slice(0, 4)
  const firstThreeDigit = text.slice(0, 3)
  const length = text.length;

  switch (true) {
    case ((firstTwoDigits == 34 || firstTwoDigits == 37) && length == 15): return 'American Express'
    case (firstDigit == 4 && length == 13 || 16): return 'Visa'
    case (firstTwoDigits >= 51 && firstTwoDigits <= 55 && length == 16): return 'Master Card'
    case ((firstFourDigit == 6011 && length == 16) || (firstDigit == 5 && length == 15)): return 'Discover'
    case (firstThreeDigit >= 300 && firstThreeDigit <= 305) || firstTwoDigits == 36 || firstTwoDigits == 38 && length == 14: return 'Diners Club'
    case (((firstFourDigit == 2131 || firstFourDigit == 1800) && length == 15) || (firstTwoDigits == 35 && length == 16)): return 'JCB'
    default: return false
  }
}

export const getValueFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error retrieving value from AsyncStorage:', error);
    return null;
  }
};


export const setValueInAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing value in AsyncStorage:', error);
  }
};

export const removeDataFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};