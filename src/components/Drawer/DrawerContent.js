import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

import {StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerContent = props => {
  const theme = useTheme();
  const filterdProps = {
    ...props,
    state: {
      ...props.state,
      routes: props.state.routes.filter(route => route.name !== 'HitInfo'),
    },
  };

  const styles = StyleSheet.create({
    headerContainer: {
      height: 80,
      padding: 12,
      justifyContent: 'center',
    },
    headerLabel: {
      color: theme.colors.text,
      fontSize: 20,
    },
  });
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerLabel}>Scraper</Text>
        </View>
        <Divider />
        <DrawerItemList {...filterdProps} />
        <Divider />
        <View style={{}}>
          <DrawerItem
            icon={() => (
              <Icon name="help" color={theme.colors.text} size={24} />
            )}
            labelStyle={{color: theme.colors.text}}
            label="Help"
            onPress={() => {}}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
