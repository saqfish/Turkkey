import React from 'react';
import {Appbar} from 'react-native-paper';

import {DrawerActions} from '@react-navigation/native';

const ScrapeAppBar = props => {
  const {navigation} = props;
  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title="Hits" />
      {props.children}
    </Appbar.Header>
  );
};

export default ScrapeAppBar;
