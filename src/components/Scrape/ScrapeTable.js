import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  Text,
  Title,
  Caption,
  Divider,
  Subheading,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScrapeTable = props => {
  const {data: bank, navigation} = props;
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
      : 'arrow-bottom-right';
  };
  return (
    <View>
      {bank.map(hit => {
        const hasRating =
          typeof hit.rating !== 'undefined' &&
          typeof hit.rating.attrs !== 'undefined' &&
          typeof hit.rating.attrs.pay !== 'undefined';
        const ratingProp = {
          name: hasRating ? getPayIcon(hit.rating.attrs.pay) : null,
          color: hasRating ? getPayColor(hit.rating.attrs.pay) : 'grey',
          size: 20,
        };
        return (
          <View key={hit.hit_set_id}>
            <Card
              onPress={() => {
                navigation.navigate('HitInfo', {hit});
              }}>
              <Card.Title
                subtitle={<Subheading>{hit.title}</Subheading>}
                title={
                  <>
                    <Title>
                      <Icon name="currency-usd" color={'grey'} size={20} />
                      {hit.monetary_reward.amount_in_dollars.toFixed(2)}
                    </Title>
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
                right={inProps => {}}
                rightStyle={styles.cardRight}
              />
              <Card.Content style={styles.cardContent}>
                <Caption>{hit.description}</Caption>
              </Card.Content>
            </Card>
            <Divider />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  cardRight: {
    marginVertical: 0,
    paddingRight: 16,
    margin: 0,
  },
  cardContent: {
    marginVertical: 0,
  },
});

export default ScrapeTable;
