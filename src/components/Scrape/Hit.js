import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Subheading, Divider} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Hit = React.memo(props => {
  const {hit, navigation} = props;
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
    cardRight: {
      marginVertical: 0,
      paddingRight: 10,
    },
    cardContent: {
      marginVertical: 0,
    },
    cardTitle: {
      marginBottom: 0,
      marginVertical: 0,
    },
    labels: {
      flexDirection: 'row',
      marginVertical: 0,
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
          right={() => <Subheading> {hit.assignable_hits_count}</Subheading>}
          rightStyle={styles.cardRight}
          titleStyle={styles.cardTitle}
        />
        <Card.Content style={styles.labels}>
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

export default Hit;
