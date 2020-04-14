import React, {useContext, useState} from 'react';
import {Appbar} from 'react-native-paper';

import {DrawerActions} from '@react-navigation/native';

import {scrapeContext} from '../Context';

import BackgroundTimer from 'react-native-background-timer';

let interval;

const AppBar = props => {
  const {navigation, darkness} = props;
  const {dark, setDark} = darkness;
  const {setScrape} = useContext(scrapeContext);

  const [scraping, setScraping] = useState(false);
  const runScrape = () => {
    const qual = true;
    const masters = false;
    let url = `https://worker.mturk.com/?page_size=20&filters%5Bqualified%5D=${qual}&filters%5Bmasters%5D=${masters}&sort=updated_desc&filters%5Bmin_reward%5D=${0.01}`;
    if (!scraping) {
      interval = BackgroundTimer.setInterval(() => {
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
            stopScrape();
          });
      }, 1000);
    } else {
      stopScrape();
    }
  };
  const stopScrape = () => {
    BackgroundTimer.clearInterval(interval);
    setScraping(false);
  };

  return (
    <Appbar>
      <Appbar.Action
        icon="menu"
        onPress={() =>
          navigation.current.dispatch(DrawerActions.toggleDrawer())
        }
      />
      <Appbar.Content />
      <Appbar.Action
        icon={`brightness-${dark ? '5' : '4'}`}
        onPress={() => setDark(!dark)}
      />
      <Appbar.Action
        icon={scraping ? 'star' : 'star-outline'}
        onPress={() => runScrape()}
      />
    </Appbar>
  );
};

export default AppBar;
