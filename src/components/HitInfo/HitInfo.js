import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {
  Divider,
  Card,
  Title,
  withTheme,
  List,
  IconButton,
} from 'react-native-paper';

import AppBar from './HitInfoAppBar';
import Progress from './Progress';

import {HitInfoStyles as styles} from '@styles';

const HitInfo = props => {
  const {hit, hasRating} = props.route.params;
  const {navigation} = props;
  console.log(hit.requesterInfo);

  const comm = hasRating ? hit.rating.attrs.comm : 0;
  const fair = hasRating ? hit.rating.attrs.fair : 0;
  const fast = hasRating ? hit.rating.attrs.fast : 0;
  const pay = hasRating ? hit.rating.attrs.pay : 0;

  const regExApprovalString = hit.requesterInfo.taskApprovalRate.match(/\d+/g);
  const approvalRating = regExApprovalString ? regExApprovalString : 0;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <AppBar navigation={navigation} />
        <List.Item
          title={<Title>{hit.requester_name}</Title>}
          right={inProps => {
            return (
              <>
                <List.Icon {...inProps} icon="heart" />
                <List.Icon {...inProps} icon="block-helper" />
              </>
            );
          }}
        />
        <Card>
          <>
            <Card.Content>
              {Progress('Approval', approvalRating, 100)}
            </Card.Content>
            <Card.Content>{Progress('Communcation', comm, 5)}</Card.Content>
            <Card.Content>{Progress('Fairness', fair, 5)}</Card.Content>
            <Card.Content>{Progress('Promptness', fast, 5)}</Card.Content>
            <Card.Content>{Progress('Generocity', pay, 5)}</Card.Content>
          </>
          <Card.Content />
        </Card>
        <Card>
          <List.Item title={hit.title} description={hit.description} />
          <List.Item
            right={inProps => {
              return (
                <>
                  <IconButton {...inProps} icon="heart" onPress={() => {}} />
                  <IconButton
                    {...inProps}
                    icon="block-helper"
                    onPress={() => {}}
                  />
                  <IconButton
                    {...inProps}
                    icon="open-in-app"
                    onPress={() => {}}
                  />
                  <IconButton
                    {...inProps}
                    icon="open-in-app"
                    onPress={() => {}}
                  />
                </>
              );
            }}
          />
        </Card>

        <Divider />

        {hit.project_requirements.length > 0 ? (
          <>
            <List.Subheader>Qualificaitons</List.Subheader>
            <ScrollView style={styles.scrollView}>
              {hit.project_requirements.map(
                (
                  {
                    qualification_type: qualification,
                    caller_meets_requirement: hasQualification,
                  },
                  index,
                ) => {
                  return (
                    <List.Item
                      key={index}
                      title={qualification.name}
                      description={qualification.description}
                      right={inProps => <List.Icon {...inProps} icon="check" />}
                    />
                  );
                },
              )}
            </ScrollView>
          </>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default withTheme(HitInfo);

/*
            onPress={() => {
              const uri = `https://worker.mturk.com/${
                hit.accept_project_task_url
              }`;
              navigation.navigate('WebView', {
                uri,
              });
            }}
            onPress={() => {
              const uri = `https://worker.mturk.com/${hit.project_tasks_url}`;
              navigation.navigate('WebView', {
                uri,
              });
            }}
	    */
