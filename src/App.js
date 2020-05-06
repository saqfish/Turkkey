import 'react-native-get-random-values';
import React, {useEffect, useState, useRef} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {darkTheme, lightTheme} from './styles';
import {getValues, storeValues} from './utils';

import ErrorBar from './components/ErrorBar';
import Drawer from './components/Drawer/Drawer';

import {snackBarContext} from './components/Context';

export default function App() {
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
      storeValues({scrapeValues, settingsValues});
    }
  }, [scrapeValues, settingsValues]);
  useEffect(() => {
    if (!initialValuesLoaded.current) {
      initialValuesLoaded.current = true;
      getValues()
        .then(values => {
          const {scrape, settings} = values;
          setSettingsValues(settings);
          setScrapeValues(scrape);
        })
        .catch(values => {
          const {scrape, settings} = values;
          setSettingsValues(settings);
          setScrapeValues(scrape);
        });
    }
  }, []);

  const theme = settingsValues.dark ? darkTheme : lightTheme;

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
