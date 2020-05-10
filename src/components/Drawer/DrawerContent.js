import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

import {version} from '@package';
import {AppStyles} from '@styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerContent = props => {
  const theme = useTheme();
  const {drawerStyles: styles} = AppStyles;
  const filterdProps = {
    ...props,
    state: {
      ...props.state,
      routes: props.state.routes.filter(route => route.name !== 'HitInfo'),
    },
  };

  const color = {
    color: theme.colors.text,
  };

  console.log(styles.drawerContainer);
  console.log(styles.appName);

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.drawerContainer}>
          <Text style={{...styles.appName, ...color}}>Turrkey</Text>
          <Text style={{...styles.appVersion, ...color}}>{version}</Text>
        </View>
        <Divider />
        <DrawerItemList {...filterdProps} />
        <Divider />
        <View style={{}}>
          <DrawerItem
            icon={() => <Icon name="help" color={color.color} size={24} />}
            labelStyle={color.color}
            label="Help"
            onPress={() => {}}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
