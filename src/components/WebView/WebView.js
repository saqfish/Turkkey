import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactWebView from 'react-native-webview';
import AppBar from './../AppBar/AppBar.js';

const WebView = props => {
  const {navigation} = props;
  return (
    <View style={styles.webViewView}>
      <AppBar navigation={navigation} />
      <ReactWebView
        source={{uri: 'https://worker.mturk.com/dashboard'}}
        onNavigationStateChange={state => {}}
        onError={() => console.warn('error')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewView: {
    flex: 1,
  },
});
export default WebView;
