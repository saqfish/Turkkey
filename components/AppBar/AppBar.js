import React, {useContext, useState} from 'react';
import {Appbar} from 'react-native-paper';

import {scrapeContext} from '../Context';

import {DrawerActions} from '@react-navigation/native';

import BackgroundTimer from 'react-native-background-timer';

const AppBar = props => {
  const {navigation, error} = props;
  const {setScrape} = useContext(scrapeContext);

  const [scraping, setScraping] = useState(false);
  const [interval, setInterval] = useState(null);
  const runScrape = () => {
    const qual = true;
    const masters = false;
    let url = `https://worker.mturk.com/?page_size=20&filters%5Bqualified%5D=${qual}&filters%5Bmasters%5D=${masters}&sort=updated_desc&filters%5Bmin_reward%5D=${0.01}`;
    if (!scraping && interval === null) {
      setInterval(
        BackgroundTimer.setInterval(() => {
          setScraping(true);
          fetch(`${url}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(res => setScrape(res))
            .catch(() => {
              error('Error getting data, are you loged in?', 'login').then(() =>
                navigation.current.navigate('WebView'),
              );
              stopScrape();
            });
        }, 1000),
      );
    } else {
      stopScrape();
    }
  };
  const stopScrape = () => {
    BackgroundTimer.clearInterval(interval);
    setInterval(null);
    setScraping(false);
  };

  return (
    <>
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
    </>
  );
};

export default AppBar;
