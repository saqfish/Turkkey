import React from 'react';
import {Appbar} from 'react-native-paper';

import {DrawerActions} from '@react-navigation/native';

const AppBar = props => {
  const {navigation} = props;
  const {scraping, interval, runScrape} = props.func;

  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() =>
          navigation.current.dispatch(DrawerActions.toggleDrawer())
        }
      />
      <Appbar.Content />
      <Appbar.Action
        icon={scraping ? 'stop-circle' : 'flash-circle'}
        onPress={() => runScrape()}
        disabled={(interval && !scraping) || (!interval && scraping)}
      />
    </Appbar.Header>
  );
};

export default AppBar;
