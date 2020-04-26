import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {styles} from '../../styles';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const DrawerContent = props => {
  const theme = useTheme();
  const {dark, setDark} = props.darkness;

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerLabel}>Header</Text>
        </View>
        <DrawerItemList {...props} />
        <Divider />
        <View style={{}}>
          <DrawerItem
            icon={() => (
              <Icon
                name={`brightness-${!dark ? '5' : '4'}`}
                color={theme.colors.text}
                size={24}
              />
            )}
            labelStyle={{color: theme.colors.text}}
            label={`${!dark ? 'Light' : 'Dark'} mode`}
            onPress={() => setDark(!dark)}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;
