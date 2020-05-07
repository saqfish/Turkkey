import React from 'react';
import {Appbar} from 'react-native-paper';

const SettingsAppBar = props => {
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
      <Appbar.Content title="Settings" />
      <Appbar.Action />
    </Appbar.Header>
  );
};

export default SettingsAppBar;
