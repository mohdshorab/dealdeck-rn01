import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import cameraIcon from '../../assets/icons/cameraIcon.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerComponent = ({ onSelectImage }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const options = {
    includeBase64: true,
    mediaType: 'photo',
    quality: 1,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };

  const handleOpenCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result?.assets) {
        const res = `data:image/jpeg;base64,${result?.assets[0]?.base64}`;
        setSelectedImage(res);
        onSelectImage(res);
        setModalVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectFromGallery = async () => {
    try {


      const result = await launchImageLibrary(options);
      if (result?.assets) {
        const res = `data:image/jpeg;base64,${result?.assets[0]?.base64}`;
        setSelectedImage(res);
        onSelectImage(res);
        setModalVisible(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {!selectedImage ? <Image source={cameraIcon} style={[styles.icon, { width: 80, height: 80 }]} />
          : <Image source={{ uri: selectedImage }} style={[styles.icon]} />
        }
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Open Camera" onPress={handleOpenCamera} />
            <Button title="Select from Gallery" onPress={handleSelectFromGallery} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 120,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#00C0FF",
    backgroundColor: "grey",
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default ImagePickerComponent;
