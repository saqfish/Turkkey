import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import WebView from '../WebView/WebView.js';
import ScrapeScreen from '../Scrape/Scrape.js';
import SettingsScreen from '../Settings/Settings.js';
import HitInfo from '../HitInfo/HitInfo.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContent from './DrawerContent';

const DrawerNav = createDrawerNavigator();

const Drawer = props => {
  const {navigation, theme, darkness} = props;
  const {dark, setDark} = darkness;

  return (
    <NavigationContainer ref={navigation} theme={theme}>
      <DrawerNav.Navigator
        initialRouteName="Scrape"
        options={{
          animationEnabled: false,
        }}
        drawerContentOptions={{
          activeTintColor: theme.colors.text,
          // backgroundColor: theme.colors.primary,
        }}
        drawerContent={inProps => (
          <DrawerContent {...inProps} darkness={{dark, setDark}} />
        )}>
        <DrawerNav.Screen
          options={{
            drawerIcon: () => (
              <Icon name="currency-usd" color={theme.colors.text} size={24} />
            ),
            drawerLabel: 'Hits',
          }}
          name="Scrape"
          component={ScrapeScreen}
        />
        <DrawerNav.Screen
          options={{
            drawerIcon: () => (
              <Icon name="settings" color={theme.colors.text} size={24} />
            ),
            drawerLabel: 'Settings',
          }}
          name="Settings"
          component={SettingsScreen}
        />
        <DrawerNav.Screen
          options={{
            drawerIcon: () => (
              <Icon name="web" color={theme.colors.text} size={24} />
            ),
            drawerLabel: 'Web',
          }}
          name="WebView"
          component={WebView}
        />
        <DrawerNav.Screen name="HitInfo" component={HitInfo} />
      </DrawerNav.Navigator>
    </NavigationContainer>
  );
};
export default Drawer;
