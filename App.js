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
import { stores } from './src/store';
import codePush from "react-native-code-push";



let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSplashScreen: true,
    };
  }

  async componentDidMount() {
    this.syncCodePush();
    await stores.products.init();
    setTimeout(() => {
      this.setState({ showSplashScreen: false });
    }, 2000); // 2 second delay
  }

  syncCodePush() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
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

export default codePush(codePushOptions)(App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})