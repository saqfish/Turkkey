import 'react-native-get-random-values';
import React, {useState, useRef} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {darkTheme, lightTheme} from './styles';

import AppBar from './components/AppBar/AppBar.js';
import ErrorBar from './components/ErrorBar';
import Drawer from './components/Drawer/Drawer';

export default function App() {
  console.log('App Render');

  const [dark, setDark] = useState(true);
  const navigationRef = useRef(null);

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

  return (
    <PaperProvider theme={theme}>
      <AppBar navigation={navigationRef} />
      <Drawer
        theme={theme}
        navigation={navigationRef}
        darkness={{dark, setDark}}
        snackbar={error}
      />
      {snackBarState.errorBar && (
        <ErrorBar
          {...snackBarState.errorBar}
          visible={snackBarState.errorBar.visible}
          action={snackBarState.errorBar.action}
          onDismiss={handleErrorBarClose}
        />
      )}
    </PaperProvider>
  );
}
