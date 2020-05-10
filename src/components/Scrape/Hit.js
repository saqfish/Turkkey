import React from 'react';
import {View} from 'react-native';
import {Card, Text, Subheading, Divider, withTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {HitStyles as styles} from '@styles';
import {getRatingColor} from '@utils';

const Hit = React.memo(props => {
  const {hit, navigation} = props;

  const hasRating =
    typeof hit.rating !== 'undefined' &&
    typeof hit.rating.attrs !== 'undefined' &&
    typeof hit.rating.attrs.pay !== 'undefined';

  const requesterStyle = {
    style: {
      ...styles.requesterStyle,
      borderColor: hasRating ? getRatingColor(hit.rating.attrs.pay, 5) : 'grey',
    },
  };

  return (
    <View>
      <Divider inset={true} />
      <Card
        elevation={0}
        onPress={() => {
          navigation.navigate('HitInfo', {hit, hasRating});
        }}>
        <Card.Title
          title={<Text>{hit.requester_name}</Text>}
          subtitle={<Subheading>{hit.title}</Subheading>}
          right={inProps => (
            <View {...inProps}>
              <Subheading style={styles.timeLabel}>{hit.time}</Subheading>
              <Subheading style={styles.moneyLabel}>
                <Icon name="currency-usd" color={'green'} size={16} />
                {hit.monetary_reward.amount_in_dollars.toFixed(2)}
              </Subheading>
            </View>
          )}
          left={() => <Text {...requesterStyle} />}
          style={styles.cardStyle}
          subtitleStyle={styles.cardSubtitle}
          rightStyle={styles.cardRight}
          leftStyle={styles.cardLeft}
          titleStyle={styles.cardTitle}
        />
      </Card>
    </View>
  );
});

export default withTheme(Hit);
