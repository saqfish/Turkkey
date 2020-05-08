import React from 'react';
import {Appbar} from 'react-native-paper';

const HitInfoAppBar = props => {
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
      <Appbar.Content title="Hit Details" />
      <Appbar.Action />
    </Appbar.Header>
  );
};

export default HitInfoAppBar;
