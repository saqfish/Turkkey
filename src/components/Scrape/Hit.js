import React from 'react';
import {View} from 'react-native';
import {
  IconButton,
  Card,
  Text,
  Subheading,
  Divider,
  withTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {hitStyles as styles} from './styles';
import {getPayColor, getPayIcon} from '../../utils';

const Hit = React.memo(props => {
  const {hit, navigation, theme} = props;

  const hasRating =
    typeof hit.rating !== 'undefined' &&
    typeof hit.rating.attrs !== 'undefined' &&
    typeof hit.rating.attrs.pay !== 'undefined';
  const ratingProp = {
    name: hasRating ? getPayIcon(hit.rating.attrs.pay) : 'minus',
    color: hasRating ? getPayColor(hit.rating.attrs.pay) : 'grey',
    size: 20,
  };

  return (
    <View>
      <Divider />
      <Card
        onPress={() => {
          navigation.navigate('HitInfo', {hit, hasRating});
        }}>
        <Card.Title
          title={
            <Text>
              <Icon {...ratingProp} />
              {hit.requester_name}
            </Text>
          }
          subtitle={<Subheading>{hit.title}</Subheading>}
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
