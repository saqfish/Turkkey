import React, {useState, useRef} from 'react';

import {Appbar} from 'react-native-paper';
import {Provider as PaperProvider} from 'react-native-paper';

import {Text, View} from 'react-native';
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

export default function App() {
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
  };
  const customLight = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, primary: '#fff'},
    fonts,
  };

  const [dark, setDark] = useState(true);
  const theme = dark ? customDark : customLight;
  const navigationTheme = dark
    ? customDark
    : {...customLight, colors: {...customLight.colors, primary: '#000000'}};

  function SettingsScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Settings </Text>
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
          <Drawer.Screen name="Queue" component={QueueScreen} />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen name="Block List" component={BlockListScreen} />
          <Drawer.Screen name="Include List" component={IncludeListScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
