import 'react-native-get-random-values';
import React, {useEffect, useState, useRef} from 'react';
import BackgroundTimer from 'react-native-background-timer';
import {Provider as PaperProvider} from 'react-native-paper';

import {scrapeContext} from './components/Context';
import {getHits} from './utils';

import {darkTheme, lightTheme} from './styles';

import AppBar from './components/AppBar/AppBar.js';
import ErrorBar from './components/ErrorBar';
import Drawer from './components/Drawer/Drawer';

export default function App() {
  const [scrape, setScrape] = useState([]);
  const [scraping, setScraping] = useState(false);
  const [interval, setInterval] = useState(null);

  const [dark, setDark] = useState(true);
  const navigationRef = useRef(null);
  const scrapeRef = useRef(null);

  const theme = dark ? darkTheme : lightTheme;

  const [snackBarState, setSnackBarState] = useState({errorBar: null});

  const handleErrorBarClose = () => {
    const {errorBar} = snackBarState;
    setSnackBarState({...errorBar, visible: false});
  };

  const error = (text, actionText, type) => {
    return new Promise((resolve, reject) => {
      setSnackBarState({
        errorBar: {
          text,
          action: {label: actionText, onPress: resolve},
          resolve,
          reject,
          visible: true,
        },
      });
    });
  };

  const runScrape = () => {
    if (!scraping && interval === null) {
      setInterval(
        BackgroundTimer.setInterval(() => {
          setScraping(true);
          getHits(false)
            .then(res => {
              res.forEach(hit => {
                hit.isNew = scrapeRef.current.some(value => {
                  return value.hit_set_id === hit.hit_set_id;
                });
                if (!hit.isNew) {
                  console.log(`${hit.hit_set_id} is new`);
                }
              });
              setScrape(res);
            })
            .catch(runScrapeError => {
              console.log(`runScrape Error: ${runScrapeError}`);
              if (navigationRef.current.getRootState().index === 0) {
                error('Error getting data, are you loged in?', 'login').then(
                  () => navigationRef.current.navigate('WebView'),
                );
              }
            });
        }, 1000),
      );
    } else {
      stopScrape();
    }
  };
  useEffect(() => {
    scrapeRef.current = scrape;
  }, [scrape]);
  const stopScrape = () => {
    BackgroundTimer.clearInterval(interval);
    setInterval(null);
    setScraping(false);
  };

  return (
    <PaperProvider theme={theme}>
      <scrapeContext.Provider value={{scrape, setScrape}}>
        <AppBar
          func={{scraping, interval, runScrape}}
          navigation={navigationRef}
        />
        <Drawer
          theme={theme}
          navigation={navigationRef}
          darkness={{dark, setDark}}
        />
        {snackBarState.errorBar && (
          <ErrorBar
            {...snackBarState.errorBar}
            visible={snackBarState.errorBar.visible}
            action={snackBarState.errorBar.action}
            onDismiss={handleErrorBarClose}
          />
        )}
      </scrapeContext.Provider>
    </PaperProvider>
  );
}
