import React from 'react';
import {Appbar} from 'react-native-paper';

const AppBar = props => {
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
      <Appbar.Content />
      <Appbar.Action />
    </Appbar.Header>
  );
};

export default AppBar;
