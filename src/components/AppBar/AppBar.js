import React from 'react';
import {Appbar} from 'react-native-paper';

import {DrawerActions} from '@react-navigation/native';

const AppBar = props => {
  console.log('AppBar Render');
  const {navigation} = props;

  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() =>
          navigation.current.dispatch(DrawerActions.toggleDrawer())
        }
      />
      <Appbar.Content />
      <Appbar.Action />
    </Appbar.Header>
  );
};

export default AppBar;
