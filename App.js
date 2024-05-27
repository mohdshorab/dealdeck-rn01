/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  Text
} from 'react-native';
import FlashScreen from './src/screens/FlashScreen';
import AppStackNavigation from './src/navigation/Nav';
import Toast from 'react-native-toast-message';
import { StoreProvider } from './src/store';
import NetInfo from '@react-native-community/netinfo';
import { stores } from './src/store';
import codePush from "react-native-code-push";
import ShowToast from './src/components/Toast/toast';



let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

class App extends Component {

  constructor(props) {
    super(props);
    this.internet = null;
    this.state = {
      showSplashScreen: true,
      progress: false,
      downloadProgress: 0,
    };
  }

  async componentDidMount() {
    await stores.products.init().then(() => {
      setTimeout(() => {
        this.setState({ showSplashScreen: false });
      }, 3000); // 3-second delay
    });

    this.internet = NetInfo.addEventListener((state) => {
      console.log('checkstate', state.isConnected, state);
      const text1 = state?.isConnected ? 'You are connected with internet' : 'Disconnected'
      const type = state?.isConnected ? 'success' : 'error';
      ShowToast({ type: type, text1: text1, color: type == 'error' ? "red" : 'green', })
      if (state.isConnected && !stores.auth.isNetworkAvailable) {
        this.syncData();
      }
      if (state.isConnected) {
        this.syncCodePush();
      }
      stores.auth.setNetworkAvailability(state.isConnected);
    });
    this.syncCodePush();
  }


  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading packages....')
        this.setState({ progress: true });
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user sction....')
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('App up to date.')
        this.setState({ progress: false })
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('log Update cancelled by user.')
        this.setState({ progress: false })
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed and will be reflected on re-start.')
        this.setState({ progress: false })
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occur.')
        this.setState({ progress: false })
        break;
    }
  }

  codePushDownloadProgress(progress) {
    this.setState({
      progress: true,
      downloadProgress: progress.receivedBytes / progress.totalBytes,
    });
  }


  syncCodePush() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadProgress.bind(this)
    );
  }

  showProgressView() {
    const { progress, downloadProgress } = this.state;
    return (
      <Modal visible={progress} transparent>
        <View style={styles.progressContainer}>
          <View style={styles.progressContent}>
            <Text style={styles.progressText}>Downloading Packages...</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressBarFill, { width: `${downloadProgress * 100}%` }]} />
            </View>
            <Text style={styles.progressPercentage}>{`${Math.round(downloadProgress * 100)}%`}</Text>
          </View>
        </View>
      </Modal>
    );
  }


  render() {
    const { showSplashScreen } = this.state;
    return (
      <StoreProvider>
        <SafeAreaView style={styles.container} >
          {showSplashScreen ? <FlashScreen /> : <AppStackNavigation isLoggedIn={false} />}
          <Toast />
          {this.showProgressView()}
        </SafeAreaView>
      </StoreProvider>
    );
  }
}

export default codePush(codePushOptions)(App);



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    width: 200,
    height: 16,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00C0FF',
  },
  progressPercentage: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 8,
  },
})