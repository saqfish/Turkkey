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

export default function App() {
  const ref = useRef(null);

  const [dark, setDark] = useState(true);
  const theme = dark ? DarkTheme : DefaultTheme;

  function QueueScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Queue </Text>
      </View>
    );
  }
  function ScrapeScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> Scrape </Text>
      </View>
    );
  }
  function HistoryScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> History </Text>
      </View>
    );
  }
  function BlockListScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> BlockList </Text>
      </View>
    );
  }
  function IncludeListScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> IncludeList </Text>
      </View>
    );
  }

  function SettingsScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text> IncludeList </Text>
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
      <NavigationContainer ref={ref} theme={theme}>
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
