import React from 'react';
import {View} from 'react-native';
import {Caption} from 'react-native-paper';
import {Avatar, IconButton, Card, Title, Paragraph} from 'react-native-paper';

const HitInfo = props => {
  const {hit} = props.route.params;
  return (
    <Card>
      <Card.Title title={hit.requester_name} subtitle={hit.title} />
      <Card.Content>
        <Paragraph>{hit.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton name="web">Cancel</IconButton>
        <IconButton name="web">Ok</IconButton>
      </Card.Actions>
    </Card>
  );
};

export default HitInfo;
