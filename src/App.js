import 'react-native-get-random-values';
import React, {useState, useRef} from 'react';

import {Provider as PaperProvider} from 'react-native-paper';

import {scrapeContext} from './components/Context';
import {darkTheme, lightTheme} from './styles';

import AppBar from './components/AppBar/AppBar.js';
import ErrorBar from './components/AppBar/ErrorBar';
import Drawer from './components/Drawer/Drawer';

export default function App() {
  const ref = useRef(null);
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

  const [dark, setDark] = useState(true);
  const [scrape, setScrape] = useState([]);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <scrapeContext.Provider value={{scrape, setScrape}}>
        <AppBar error={error} navigation={ref} />
        <Drawer theme={theme} navigation={ref} darkness={{dark, setDark}} />
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
