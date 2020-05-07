import React from 'react';
import {View} from 'react-native';
import {
  Divider,
  Card,
  Paragraph,
  Subheading,
  withTheme,
} from 'react-native-paper';

import AppBar from './../AppBar/AppBar';
import Button from './Button';
import Progress from './Progress';

import {HitInfoStyles as styles} from '@styles';

const HitInfo = props => {
  const {hit, hasRating} = props.route.params;
  const {navigation} = props;

  const comm = hasRating ? hit.rating.attrs.comm : 0;
  const fair = hasRating ? hit.rating.attrs.fair : 0;
  const fast = hasRating ? hit.rating.attrs.fast : 0;
  const pay = hasRating ? hit.rating.attrs.pay : 0;

  return (
    <View style={styles.container}>
      <AppBar navigation={navigation} />
      <Card>
        <Card.Title title={hit.requester_name} subtitle={hit.title} />
        {hasRating ? (
          <>
            <Card.Content>{Progress('Communcation', comm)}</Card.Content>
            <Card.Content>{Progress('Fair', fair)}</Card.Content>
            <Card.Content>{Progress('Fast', fast)}</Card.Content>
            <Card.Content>{Progress('Pay', pay)}</Card.Content>
          </>
        ) : (
          <Card.Content>
            <Subheading>No rating data available</Subheading>
          </Card.Content>
        )}
        <Card.Actions style={styles.actionButtons}>
          <Button onPress={() => {}} title="Block" />
          <Button onPress={() => {}} title="Include" />
        </Card.Actions>
      </Card>
      <Divider />
      <Card>
        <Card.Content>
          <Paragraph>{hit.description}</Paragraph>
        </Card.Content>
      </Card>

      <Divider />

      <Card>
        <Card.Title subtitle="Qualificaitons" />
        <Card.Content>
          {hit.project_requirements.map(
            (
              {
                qualification_type: qualification,
                caller_meets_requirement: hasQualification,
              },
              index,
            ) => {
              return <Paragraph key={index}>{qualification.name}</Paragraph>;
            },
          )}
        </Card.Content>
      </Card>

      <View style={styles.bottomButtonsContainer}>
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
      </View>
    </View>
  );
};

export default withTheme(HitInfo);
