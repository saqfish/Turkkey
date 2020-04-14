import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import ReactWebView from 'react-native-webview';

import {loginContext} from '../Context';

const WebView = ({navigation}) => {
  const {login, setLogin} = useContext(loginContext);
  useEffect(() => {
    if (login) navigation.goBack();
  }, [login]);
  return (
    <View style={{flex: 1}}>
      <ReactWebView
        source={{uri: 'https://worker.mturk.com/'}}
        onNavigationStateChange={state => {
          console.log(state.url);
          let expression = /^(https|http):\/\/(worker.mturk.com)\/*/g;
          setLogin(state.url.match(expression));
        }}
        onError={() => console.warn('error')}
      />
    </View>
  );
};

export default WebView;
