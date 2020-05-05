import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AppBar from './../AppBar/AppBar.js';
import Slider from '@react-native-community/slider';
import {Divider, List, Switch, Text, withTheme} from 'react-native-paper';

import {scrapeContext} from '../Context';

const Settings = props => {
  const {navigation} = props;
  const {theme} = props;

  const context = useContext(scrapeContext);
  const {scrapeValues, settingsValues} = context;

  const {reward, rate, qualified, masters} = scrapeValues.scrapeValues;
  const {setScrapeValues} = scrapeValues;

  const onRewardChange = value => {
    let newValue = parseFloat(value.toFixed(4));
    setScrapeValues(prev => ({...prev, reward: newValue}));
  };

  const onRateChange = value => {
    let newValue = parseFloat(value.toFixed(4));
    setScrapeValues(prev => ({...prev, rate: newValue}));
  };

  const onQualifiedChange = value =>
    setScrapeValues(prev => ({...prev, qualified: value}));

  const onMastersChange = value =>
    setScrapeValues(prev => ({...prev, masters: value}));

  const {setSettingsValues} = settingsValues;

  const {dark, pre, to, quickMenu} = settingsValues.settingsValues;

  const onDarkChange = value =>
    setSettingsValues(prev => ({...prev, dark: value}));

  const onQuickMenuChange = value =>
    setSettingsValues(prev => ({...prev, quickMenu: value}));

  const onTOChange = value => setSettingsValues(prev => ({...prev, to: value}));

  const onPREChange = value =>
    setSettingsValues(prev => ({...prev, pre: value}));

  const styles = StyleSheet.create({
    settintsView: {
      flex: 1,
    },
    slider: {width: 200, height: 40},
    switch: {color: theme.colors.text},
  });

  return (
    <View style={styles.settingsView}>
      <AppBar navigation={navigation} />
      <List.Section>
        <List.Subheader>Scrape Options</List.Subheader>
        <List.Item
          title={<Text>${reward}</Text>}
          description="Amount"
          right={() => (
            <Slider
              style={styles.slider}
              step={reward < 3 ? 0.01 : 0.1}
              minimumValue={0}
              maximumValue={reward < 6 ? 6 : 100}
              value={reward}
              onValueChange={onRewardChange}
              thumbTintColor={reward > 6 ? 'red' : 'green'}
              minimumTrackTintColor={theme.colors.text}
              maximumTrackTintColor={theme.colors.text}
            />
          )}
        />
        <List.Item
          title={<Text>{`${rate} seconds`}</Text>}
          description="Delay between scrapes"
          right={() => (
            <Slider
              style={styles.slider}
              step={0.1}
              minimumValue={0}
              maximumValue={5}
              value={rate}
              onValueChange={onRateChange}
              thumbTintColor={rate > 6 ? 'red' : 'green'}
              minimumTrackTintColor={theme.colors.text}
              maximumTrackTintColor={theme.colors.text}
            />
          )}
        />
        <List.Item
          title={<Text>Qualified</Text>}
          right={inProps => {
            return (
              <Switch
                color={styles.switch.color}
                value={qualified}
                onValueChange={onQualifiedChange}
              />
            );
          }}
        />

        <List.Item
          title={<Text>Masters</Text>}
          right={inProps => {
            return (
              <Switch
                color={styles.switch.color}
                value={masters}
                onValueChange={onMastersChange}
              />
            );
          }}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title={<Text>Dark Mode</Text>}
          right={inProps => {
            return (
              <Switch
                color={styles.switch.color}
                value={dark}
                onValueChange={onDarkChange}
              />
            );
          }}
        />
        <List.Item
          title={<Text>Quick Menu</Text>}
          right={inProps => {
            return (
              <Switch
                color={styles.switch.color}
                value={quickMenu}
                onValueChange={onQuickMenuChange}
              />
            );
          }}
        />
      </List.Section>
      <Divider />
      <List.Section>
        <List.Subheader>Pre</List.Subheader>
        <List.Item
          title={<Text>Pause on PRE error</Text>}
          right={inProps => {
            return (
              <Switch
                color={styles.switch.color}
                value={pre}
                onValueChange={onPREChange}
              />
            );
          }}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Ratings</List.Subheader>
        <List.Item
          title={<Text>Use TurkOpticon</Text>}
          right={inProps => {
            return (
              <Switch
                color={styles.switch.color}
                value={to}
                onValueChange={onTOChange}
              />
            );
          }}
        />
      </List.Section>
    </View>
  );
};

export default withTheme(Settings);
