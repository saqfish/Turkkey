import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppBar from './../AppBar/AppBar.js';
import Slider from '@react-native-community/slider';
import {List} from 'react-native-paper';
import {Text, withTheme} from 'react-native-paper';

const Settings = props => {
  const {navigation} = props;
  const {theme} = props;

  const [reward, setReward] = useState(0);
  const onRewardChange = value => {
    let newValue = parseFloat(value.toFixed(4));
    setReward(newValue);
  };

  return (
    <View style={styles.settingsView}>
      <AppBar navigation={navigation} />
      <List.Section>
        <List.Subheader>Scrape</List.Subheader>
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
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  settintsView: {
    flex: 1,
  },
  slider: {width: 200, height: 40},
});
export default withTheme(Settings);
