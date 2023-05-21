/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import FlashScreen from './src/screens/FlashScreen';
import AppStackNavigation from './src/navigation/Nav';
import Toast from 'react-native-toast-message';
import { StoreProvider } from './src/store';
import firebase from 'firebase/app';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSplashScreen: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showSplashScreen: false });
    }, 2000); // 2 second delay
  }

  render() {
    const { showSplashScreen } = this.state;
    return (
      <StoreProvider>
        <SafeAreaView style={styles.container} >
          {showSplashScreen ? <FlashScreen /> : <AppStackNavigation isLoggedIn={true} />}
          <Toast />
        </SafeAreaView>
      </StoreProvider>
    );
  }
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})