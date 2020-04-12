import 'react-native-get-random-values';
import React, {createContext, useState, useRef} from 'react';

import {Appbar} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';

import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DrawerActions,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

import ScrapeScreen from './components/ScrapeOptions/ScrapeOptions.js';
import HistoryScreen from './components/History/History.js';
import QueueScreen from './components/Queue/Queue.js';
import BlockListScreen from './components/Lists/Lists.js';
import IncludeListScreen from './components/Lists/Lists.js';
import ReactWebView from 'react-native-webview';

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

  function SettingsScreen({navigation}) {
    return (
      <View style={{flex: 1}}>
        <ReactWebView
          source={{uri: 'https://worker.mturk.com/'}}
          onNavigationStateChange={state => {
            console.log(state.url);
            setLogin(!state.url.includes('https://www.amazon.com/ap/signin'));
          }}
          onError={() => console.warn('error')}
        />
      </View>
    );
  }
  function AppBar({navigation}) {
    return (
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() =>
            navigation.current.dispatch(DrawerActions.toggleDrawer())
          }
        />
        <Appbar.Action
          icon={`brightness-${dark ? '5' : '4'}`}
          onPress={() => setDark(!dark)}
        />
      </Appbar>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AppBar navigation={ref} />
      <NavigationContainer ref={ref} theme={navigationTheme}>
        <Drawer.Navigator initialRouteName="Queue">
          <Drawer.Screen name="Scrape" component={ScrapeScreen} />
          <Drawer.Screen
            name="Queue"
            component={login ? QueueScreen : SettingsScreen}
          />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen name="Block List" component={BlockListScreen} />
          <Drawer.Screen name="Include List" component={IncludeListScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
