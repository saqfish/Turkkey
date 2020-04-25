import 'react-native-get-random-values';
import React, {useState, useRef} from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import {loginContext} from './components/Context';
import {scrapeContext} from './components/Context';
import ErrorBar from './components/AppBar/ErrorBar';

import WebView from './components/WebView/WebView.js';
import ScrapeScreen from './components/Scrape/Scrape.js';
import SettingsScreen from './components/Settings/Settings.js';

import AppBar from './components/AppBar/AppBar.js';

export default function App() {
  const [login, setLogin] = useState(false);
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

  const fonts = {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300',
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300',
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300',
    },
  };

  const customDark = {
    ...DarkTheme,
    colors: {...DarkTheme.colors, accent: '#000000', primary: '#424242'},
    fonts,
    animation: {
      scale: 1.0,
    },
  };
  const customLight = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, accent: '#000000', primary: '#fff'},
    fonts,
    animation: {
      scale: 1.0,
    },
  };

  const [dark, setDark] = useState(true);
  const [scrape, setScrape] = useState({});
  const theme = dark ? customDark : customLight;
  const navigationTheme = dark
    ? customDark
    : {...customLight, colors: {...customLight.colors, primary: '#000000'}};

  return (
    <PaperProvider theme={theme}>
      <loginContext.Provider value={{login, setLogin}}>
        <scrapeContext.Provider value={{scrape, setScrape}}>
          <AppBar error={error} darkness={{dark, setDark}} navigation={ref} />
          <NavigationContainer ref={ref} theme={navigationTheme}>
            <Drawer.Navigator initialRouteName="Scrape">
              <Drawer.Screen name="Scrape" component={ScrapeScreen} />
              <Drawer.Screen name="Settings" component={SettingsScreen} />
              <Drawer.Screen name="WebView" component={WebView} />
            </Drawer.Navigator>
          </NavigationContainer>
          {snackBarState.errorBar && (
            <ErrorBar
              {...snackBarState.errorBar}
              visible={snackBarState.errorBar.visible}
              action={snackBarState.errorBar.action}
              onDismiss={handleErrorBarClose}
            />
          )}
        </scrapeContext.Provider>
      </loginContext.Provider>
    </PaperProvider>
  );
}
