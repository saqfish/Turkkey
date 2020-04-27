import React, {useContext, useState} from 'react';
import {Appbar} from 'react-native-paper';

import {scrapeContext} from '../Context';

import {DrawerActions} from '@react-navigation/native';

import BackgroundTimer from 'react-native-background-timer';
import {getTO} from './turkOpticon';

const AppBar = props => {
  const {navigation, error} = props;
  const {setScrape} = useContext(scrapeContext);

  const [scraping, setScraping] = useState(false);
  const [interval, setInterval] = useState(null);

  const getHits = (url, to) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw Error();
          }
        })
        .then(res => {
          getTO(res.results)
            .then(hits => resolve(res.results))
            .catch(() => resolve(res.results));
        })
        .catch(getHitsError => {
          console.log(`getHits Error: ${getHitsError}`);
          reject();
        });
    });
  };

  const runScrape = () => {
    const qual = true;
    const masters = false;
    let url = `https://worker.mturk.com/?page_size=20&filters%5Bqualified%5D=${qual}&filters%5Bmasters%5D=${masters}&sort=updated_desc&filters%5Bmin_reward%5D=${0.01}`;
    if (!scraping && interval === null) {
      setInterval(
        BackgroundTimer.setInterval(() => {
          setScraping(true);
          getHits(url, false)
            .then(res => {
              setScrape(res);
            })
            .catch(runScrapeError => {
              console.log(`runScrape Error: ${runScrapeError}`);
              if (navigation.current.getRootState().index === 0) {
                error('Error getting data, are you loged in?', 'login').then(
                  () => navigation.current.navigate('WebView'),
                );
              }
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
