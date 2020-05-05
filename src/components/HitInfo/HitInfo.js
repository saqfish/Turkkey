import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Divider,
  Card,
  Paragraph,
  Subheading,
  ProgressBar,
  withTheme,
} from 'react-native-paper';

import AppBar from './../AppBar/AppBar.js';

const HitInfo = props => {
  const {hit, hasRating} = props.route.params;
  const {theme, navigation} = props;
  const comm = hasRating ? hit.rating.attrs.comm : 0;
  const fair = hasRating ? hit.rating.attrs.fair : 0;
  const fast = hasRating ? hit.rating.attrs.fast : 0;
  const pay = hasRating ? hit.rating.attrs.pay : 0;

  const getRatingColor = rating => {
    return rating >= 4
      ? 'green'
      : rating >= 3
      ? 'yellow'
      : rating >= 2
      ? 'orange'
      : rating >= 1
      ? 'red'
      : 'grey';
  };
  const progress = (name, value) => {
    return (
      <View>
        <Subheading>{`${name} ${value} / 5.00`}</Subheading>
        <ProgressBar progress={value / 5} color={getRatingColor(value)} />
      </View>
    );
  };

  const Button = buttonProps => {
    const {title, onPress} = buttonProps;
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    buttonsContainer: {
      margin: 10,
      justifyContent: 'flex-start',
    },
    button: {
      color: 'green',
      backgroundColor: theme.colors.primary,
      padding: 10,
      margin: 3,
    },
    buttonLabel: {
      color: '#FFFFFF',
    },
  });
  return (
    <View>
      <AppBar navigation={navigation} />
      <Card>
        <Card.Title title={hit.requester_name} />
        {hasRating ? (
          <>
            <Card.Content>{progress('Communcation', comm)}</Card.Content>
            <Card.Content>{progress('Fair', fair)}</Card.Content>
            <Card.Content>{progress('Fast', fast)}</Card.Content>
            <Card.Content>{progress('Pay', pay)}</Card.Content>
          </>
        ) : (
          <Card.Content>
            <Subheading>No rating data available</Subheading>
          </Card.Content>
        )}
        <Card.Actions style={styles.buttonsContainer}>
          <Button onPress={() => {}} title="Block" />
          <Button onPress={() => {}} title="Include" />
        </Card.Actions>
      </Card>
      <Divider />
      <Card>
        <Card.Title title={hit.title} />
        <Card.Actions style={styles.buttonsContainer}>
          <Button
            title="Accept"
            onPress={() => {
              const uri = `https://worker.mturk.com/${
                hit.accept_project_task_url
              }`;
              navigation.navigate('WebView', {
                uri,
              });
            }}
          />
          <Button
            title="Preview"
            onPress={() => {
              const uri = `https://worker.mturk.com/${hit.project_tasks_url}`;
              navigation.navigate('WebView', {
                uri,
              });
            }}
          />
        </Card.Actions>
        <Card.Content>
          <Paragraph>{hit.description}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default withTheme(HitInfo);
