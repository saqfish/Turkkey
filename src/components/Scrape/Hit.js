import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  IconButton,
  Card,
  Text,
  Subheading,
  Divider,
  withTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Hit = React.memo(props => {
  const {hit, navigation, theme} = props;
  const getPayColor = pay => {
    return pay > 4 ? 'green' : pay > 3 ? 'yellow' : pay > 2 ? 'orange' : 'red';
  };
  const getPayIcon = pay => {
    return pay > 4
      ? 'arrow-up'
      : pay > 3
      ? 'arrow-top-right'
      : pay > 2
      ? 'arrow-bottom-right'
      : 'arrow-down';
  };

  const hasRating =
    typeof hit.rating !== 'undefined' &&
    typeof hit.rating.attrs !== 'undefined' &&
    typeof hit.rating.attrs.pay !== 'undefined';
  const ratingProp = {
    name: hasRating ? getPayIcon(hit.rating.attrs.pay) : 'help',
    color: hasRating ? getPayColor(hit.rating.attrs.pay) : 'grey',
    size: 20,
  };

  const styles = StyleSheet.create({
    cardStyle: {
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 0,
      justifyContent: 'flex-start',
    },
    cardRight: {
      justifyContent: 'flex-start',
    },
    cardLeft: {
      justifyContent: 'flex-end',
      height: 20,
      width: 20,
    },
    cardTitle: {
      marginVertical: 0,
      marginBottom: 2,
    },
    cardSubtitle: {
      justifyContent: 'flex-start',
      marginBottom: 0,
    },
    cardContent: {
      flexDirection: 'row',
      marginVertical: 0,
      paddingHorizontal: 10,
      paddingVertical: 0,
      paddingTop: 0,
      paddingBottom: 10,
    },
    moneyLabel: {
      fontSize: 16,
    },
    timeLabel: {
      fontSize: 16,
      marginLeft: 4,
    },
  });

  return (
    <View>
      <Divider />
      <Card
        onPress={() => {
          navigation.navigate('HitInfo', {hit});
        }}>
        <Card.Title
          title={
            <>
              <Text>
                <Icon {...ratingProp} />
                {hit.requester_name}
              </Text>
            </>
          }
          subtitle={
            <>
              <Subheading>{hit.title}</Subheading>
            </>
          }
          right={inProps => (
            <IconButton
              {...inProps}
              icon="chevron-right"
              onPress={() => {
                const uri = `https://worker.mturk.com/${
                  hit.accept_project_task_url
                }`;
                navigation.navigate('WebView', {
                  uri,
                });
              }}
            />
          )}
          left={() => (
            <Icon
              name={
                hit.assignable_hits_count > 1
                  ? 'file-document-box-multiple-outline'
                  : 'file-document-box-outline'
              }
              size={20}
              color={theme.colors.text}
            />
          )}
          style={styles.cardStyle}
          subtitleStyle={styles.cardSubtitle}
          rightStyle={styles.cardRight}
          leftStyle={styles.cardLeft}
          titleStyle={styles.cardTitle}
        />
        <Card.Content style={styles.cardContent}>
          <Subheading style={styles.moneyLabel}>
            <Icon name="currency-usd" color={'green'} size={16} />
            {hit.monetary_reward.amount_in_dollars.toFixed(2)}
          </Subheading>
          <Subheading style={styles.timeLabel}>
            <Icon name="clock" size={16} />
            {hit.time}
          </Subheading>
        </Card.Content>
      </Card>
    </View>
  );
});

export default withTheme(Hit);
