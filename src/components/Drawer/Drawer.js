import React, {useEffect, useState, useRef} from 'react';
import {AsyncStorage} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import WebView from '../WebView/WebView.js';
import ScrapeScreen from '../Scrape/Scrape.js';
import SettingsScreen from '../Settings/Settings.js';
import HitInfo from '../HitInfo/HitInfo.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {scrapeContext} from '../Context';

import DrawerContent from './DrawerContent';

const DrawerNav = createDrawerNavigator();

const Drawer = props => {
  const {navigation, theme, darkness} = props;
  const {dark, setDark} = darkness;
  const [pre, setPRE] = useState(false);
  const [to, setTO] = useState(true);

  const [reward, setReward] = useState(0);
  const [rate, setRate] = useState(0);
  const [qualified, setQualified] = useState(true);
  const [masters, setMasters] = useState(false);

  const init = useRef(true);

  useEffect(() => {
    if (init.current) {
      init.current = false;
    } else {
      console.log('values changed');
      storeValues();
    }
  }, [rate, reward, qualified, masters, dark, pre, to]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getValues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const storeValues = async () => {
    try {
      const scrapeValues = {rate, reward, qualified, masters};
      const settingsValues = {dark, pre, to};
      await AsyncStorage.setItem('scrapeValues', JSON.stringify(scrapeValues));
      await AsyncStorage.setItem(
        'settingsValues',
        JSON.stringify(settingsValues),
      );
    } catch (error) {}
  };

  const getValues = async () => {
    try {
      const scrapeValues = await AsyncStorage.getItem('scrapeValues');
      const settingsValues = await AsyncStorage.getItem('settingsValues');
      if (scrapeValues !== null) {
        const values = JSON.parse(scrapeValues);
        setRate(values.rate);
        setReward(values.reward);
        setQualified(values.qualified);
        setMasters(values.masters);
      }
      if (scrapeValues !== null) {
        const values = JSON.parse(settingsValues);
        setDark(values.dark);
        setPRE(values.pre);
        setTO(values.to);
      }
    } catch (error) {}
  };
  return (
    <scrapeContext.Provider
      value={{
        settings: {
          dark: {dark, setDark},
          pre: {pre, setPRE},
          to: {to, setTO},
        },
        scrape: {
          rate: {rate, setRate},
          reward: {reward, setReward},
          qualified: {qualified, setQualified},
          masters: {masters, setMasters},
        },
      }}>
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
    </scrapeContext.Provider>
  );
};
export default Drawer;
