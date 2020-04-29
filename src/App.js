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
  const [scrapeState, setScrapeState] = useState([]);
  const [newHitsState, setNewHitsState] = useState([]);
  const [scraping, setScraping] = useState(false);
  const [interval, setInterval] = useState(null);

  const [filterState, setFilterState] = useState(0);

  const [dark, setDark] = useState(true);
  const navigationRef = useRef(null);
  const scrapeRef = useRef(null);
  const newHitsRef = useRef(null);

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
    setInterval(
      BackgroundTimer.setTimeout(async () => {
        console.log(`filter: ${filterState}`);
        let newHits = [];
        setScraping(true);
        try {
          const hits = await getHits(false)
            .then(res => {
              res.forEach(hit => {
                hit.isNew = !scrapeRef.current.some(value => {
                  return value.hit_set_id === hit.hit_set_id;
                });
                if (hit.isNew) {
                  newHits.push(hit);
                }
              });
              if (filterState === 1) {
                let arr = [...newHitsRef.current, ...newHits];
                setNewHitsState(arr);
                return arr;
              }
              return res;
            })
            .catch(getHitsError => {
              console.log(`getHits Error: ${getHitsError}`);
              if (navigationRef.current.getRootState().index === 0) {
                error('Error getting data, are you loged in?', 'login').then(
                  () => navigationRef.current.navigate('WebView'),
                );
              }
            });
          console.log(`hits length: ${hits.length}`);
          setScrapeState(hits);
          runScrape();
        } catch (runScrapeError) {
          console.log(`runScrape Error: ${runScrapeError}`);
          stopScrape();
        }
      }, 1000),
    );
  };
  useEffect(() => {
    scrapeRef.current = scrapeState;
  }, [scrapeState]);

  useEffect(() => {
    newHitsRef.current = newHitsState;
  }, [newHitsState]);

  const stopScrape = () => {
    BackgroundTimer.clearTimeout(interval);
    setInterval(null);
    setScraping(false);
  };

  return (
    <PaperProvider theme={theme}>
      <scrapeContext.Provider
        value={{
          filter: {filterState, setFilterState},
          scrape: {scrapeState, setScrapeState},
        }}>
        <AppBar
          func={{scraping, interval, runScrape, stopScrape}}
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
