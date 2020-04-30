import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text, Title, Subheading} from 'react-native-paper';

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

  return (
    <Card
      onPress={() => {
        navigation.navigate('HitInfo', {hit});
      }}>
      <Card.Title
        subtitle={
          <>
            <Subheading>
              <Icon name="currency-usd" color={'green'} size={16} />
              {hit.monetary_reward.amount_in_dollars.toFixed(2)}
            </Subheading>
            <Subheading>
              <Icon name="information-variant" color={'grey'} size={16} />
              {hit.title}
            </Subheading>
          </>
        }
        title={
          <>
            <Title>
              {hasRating ? (
                <Text>
                  <Icon {...ratingProp} />
                  {hit.requester_name}
                </Text>
              ) : (
                hit.requester_name
              )}
            </Title>
          </>
        }
        right={inProps => (hit.isNew ? <Text>New!</Text> : null)}
        rightStyle={styles.cardRight}
      />
    </Card>
  );
});

const styles = StyleSheet.create({
  cardRight: {
    marginVertical: 0,
    paddingRight: 10,
  },
  cardContent: {
    marginVertical: 0,
  },
});

export default Hit;
