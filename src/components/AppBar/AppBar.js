import React, {useContext} from 'react';
import {Button, Appbar} from 'react-native-paper';

import {DrawerActions} from '@react-navigation/native';
import {scrapeContext} from '../Context';

const AppBar = props => {
  const {navigation} = props;
  const {scraping, interval, runScrape} = props.func;
  const {filter: filterObj} = useContext(scrapeContext);
  const {filterState: filter, setFilterState: setFilter} = filterObj;
  const filterTypes = type => {
    if (type > 3) {
      type = 0;
    }
    const types = {
      0: 'all',
      1: 'new',
      2: 'filter3',
      3: 'filter4',
    };
    return {label: types[type], type};
  };

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
      <Button
        mode="contained"
        onPress={() => setFilter(filterTypes(filter + 1).type)}>
        {filterTypes(filter).label}
      </Button>
    </Appbar.Header>
  );
};

export default AppBar;
