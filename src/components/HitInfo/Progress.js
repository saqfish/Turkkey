import React from 'react';
import {View} from 'react-native';
import {Subheading, ProgressBar} from 'react-native-paper';
import {getRatingColor} from '../../utils';

const Progress = (name, value) => {
  return (
    <View>
      <Subheading>{`${name} ${value} / 5.00`}</Subheading>
      <ProgressBar progress={value / 5} color={getRatingColor(value)} />
    </View>
  );
};

export default Progress;
