import 'react-native-get-random-values';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider as PaperProvider} from 'react-native-paper';

import {darkTheme, lightTheme} from './styles';

import ErrorBar from './components/ErrorBar';
import Drawer from './components/Drawer/Drawer';

import {snackBarContext} from './components/Context';

export default function App() {
  console.log('App Render');

  const initialValuesLoaded = useRef(false);

  const navigationRef = useRef(null);

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

  const [scrapeValues, setScrapeValues] = useState({});
  const [settingsValues, setSettingsValues] = useState({});

  useEffect(() => {
    if (initialValuesLoaded.current) {
      storeValues();
    }
  }, [scrapeValues, settingsValues]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!initialValuesLoaded.current) {
      initialValuesLoaded.current = true;
      getValues();
    }
  }, []);

  const storeValues = useCallback(
    async values => {
      try {
        await AsyncStorage.setItem(
          'scrapeValues',
          JSON.stringify(scrapeValues),
        );
        await AsyncStorage.setItem(
          'settingsValues',
          JSON.stringify(settingsValues),
        );
      } catch (storeError) {}
    },
    [settingsValues, scrapeValues],
  );

  const getValues = async () => {
    try {
      const newScrapeValues = await AsyncStorage.getItem('scrapeValues');
      const newSettingsValues = await AsyncStorage.getItem('settingsValues');

      if (newScrapeValues !== null) {
        const values = JSON.parse(newScrapeValues);
        setScrapeValues(values);
      }
      if (newScrapeValues !== null) {
        const values = JSON.parse(newSettingsValues);
        setSettingsValues(values);
      }
    } catch (getError) {
      console.log(getError);
    }
  };

  const {dark} = settingsValues || false;
  const theme = dark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <snackBarContext.Provider value={error}>
        <Drawer
          theme={theme}
          navigation={navigationRef}
          snackbar={error}
          settings={{settingsValues, setSettingsValues}}
          scrape={{scrapeValues, setScrapeValues}}
        />
        {snackBarState.errorBar && (
          <ErrorBar
            {...snackBarState.errorBar}
            visible={snackBarState.errorBar.visible}
            action={snackBarState.errorBar.action}
            onDismiss={handleErrorBarClose}
          />
        )}
      </snackBarContext.Provider>
    </PaperProvider>
  );
}
