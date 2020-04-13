import 'react-native-get-random-values';
import React, {useEffect, useState, useRef} from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import {loginContext} from './components/Context';

import WebView from './components/WebView/WebView.js';
import ScrapeScreen from './components/ScrapeOptions/ScrapeOptions.js';
import HistoryScreen from './components/History/History.js';
import QueueScreen from './components/Queue/Queue.js';
import BlockListScreen from './components/Lists/Lists.js';
import IncludeListScreen from './components/Lists/Lists.js';
import SettingsScreen from './components/Settings/Settings.js';

import AppBar from './components/AppBar/AppBar.js';

export default function App() {
  const [login, setLogin] = useState(false);
  const ref = useRef(null);

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
    colors: {...DarkTheme.colors, primary: '#424242'},
    fonts,
    animation: {
      scale: 1.0,
    },
  };
  const customLight = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, primary: '#fff'},
    fonts,
    animation: {
      scale: 1.0,
    },
  };

  const [dark, setDark] = useState(true);
  const theme = dark ? customDark : customLight;
  const navigationTheme = dark
    ? customDark
    : {...customLight, colors: {...customLight.colors, primary: '#000000'}};

  return (
    <PaperProvider theme={theme}>
      <loginContext.Provider value={{login, setLogin}}>
        <AppBar darkness={{dark, setDark}} navigation={ref} />
        <NavigationContainer ref={ref} theme={navigationTheme}>
          <Drawer.Navigator initialRouteName="Scrape">
            <Drawer.Screen name="Scrape" component={ScrapeScreen} />
            <Drawer.Screen
              name="Queue"
              component={login ? QueueScreen : WebView}
            />
            <Drawer.Screen name="History" component={HistoryScreen} />
            <Drawer.Screen name="Block List" component={BlockListScreen} />
            <Drawer.Screen name="Include List" component={IncludeListScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="WebView" component={WebView} />
          </Drawer.Navigator>
        </NavigationContainer>
      </loginContext.Provider>
    </PaperProvider>
  );
}