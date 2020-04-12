import React, {useContext} from 'react';
import {View} from 'react-native';
import ReactWebView from 'react-native-webview';

import {loginContext} from '../Context';

const WebView = () => {
  const {login, setLogin} = useContext(loginContext);
  return (
    <View style={{flex: 1}}>
      <ReactWebView
        source={{uri: 'https://worker.mturk.com/'}}
        onNavigationStateChange={state => {
          console.log(state.url);
          setLogin(!state.url.includes('https://www.amazon.com/ap/signin'));
        }}
        onError={() => console.warn('error')}
      />
    </View>
  );
};

export default WebView;
