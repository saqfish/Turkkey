import React from 'react';
import {View} from 'react-native';
import {Title} from 'react-native-paper';
import {Caption} from 'react-native-paper';

const HitInfo = props => {
  const {hit} = props.route.params;
  console.log(hit);
  return (
    <View style={{flex: 1}}>
      <Title>{hit.requester_name}</Title>
      <Title>{hit.title}</Title>
      <Title>{hit.description}</Title>
    </View>
  );
};

export default HitInfo;
