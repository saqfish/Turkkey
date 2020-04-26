import React from 'react';
import {View} from 'react-native';
import ReactWebView from 'react-native-webview';

const WebView = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ReactWebView
        source={{uri: 'https://worker.mturk.com/dashboard'}}
        onNavigationStateChange={state => {}}
        onError={() => console.warn('error')}
      />
    </View>
  );
};

export default WebView;
