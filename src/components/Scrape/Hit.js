import React from 'react';
import {View} from 'react-native';
import {Card, Text, Subheading, Divider, withTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {HitStyles as styles} from '@styles';
import {getPayColor, getPayIcon} from '@utils';

const Hit = React.memo(props => {
  const {hit, navigation} = props;

  const hasRating =
    typeof hit.rating !== 'undefined' &&
    typeof hit.rating.attrs !== 'undefined' &&
    typeof hit.rating.attrs.pay !== 'undefined';
  const ratingProp = {
    name: hasRating ? getPayIcon(hit.rating.attrs.pay) : 'circle-outline',
    color: hasRating ? getPayColor(hit.rating.attrs.pay) : 'grey',
    size: 35,
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
          left={() => (
            <Icon style={styles.requesterIconStyle} {...ratingProp} />
          )}
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
