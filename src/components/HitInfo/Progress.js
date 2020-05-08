import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text, ProgressBar} from 'react-native-paper';
import {getRatingColor} from '@utils';

const Progress = (name, value, max) => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>{`${name}`}</Text>
        <Text style={styles.rating}>{`${value} / ${max}`}</Text>
      </View>
      <ProgressBar progress={value / max} color={getRatingColor(value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {},
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: {
    alignSelf: 'flex-start',
  },
  rating: {
    alignSelf: 'flex-end',
  },
  progress: {},
});

export default Progress;
