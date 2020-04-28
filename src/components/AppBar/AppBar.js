import React from 'react';
import {Button, Appbar} from 'react-native-paper';

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
      <Appbar.Action />
      <Button
        icon={scraping ? 'stop-circle' : 'flash-circle'}
        mode="contained"
        onPress={() => runScrape()}
        disabled={(interval && !scraping) || (!interval && scraping)}>
        {scraping ? 'Stop' : 'Start'}
      </Button>
    </Appbar.Header>
  );
};

export default AppBar;
