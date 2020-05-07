import React from 'react';
import {Appbar} from 'react-native-paper';

const WebViewAppBar = props => {
  const {navigation} = props;

  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
        }}
      />
      <Appbar.Content title="Web" />
      <Appbar.Action />
    </Appbar.Header>
  );
};

export default WebViewAppBar;
