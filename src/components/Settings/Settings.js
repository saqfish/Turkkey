import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption} from 'react-native-paper';
import AppBar from './../AppBar/AppBar.js';

const Settings = props => {
  console.log('Settings Render');
  const {navigation} = props;
  return (
    <View style={styles.settingsView}>
      <AppBar navigation={navigation} />
      <Caption>Settings</Caption>
    </View>
  );
};

const styles = StyleSheet.create({
  settintsView: {
    flex: 1,
  },
});
export default Settings;
