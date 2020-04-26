import React from 'react';
import {View} from 'react-native';
import {IconButton, Card, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScrapeTable = props => {
  const {data: bank, navigation} = props;
  return (
    <View>
      {bank.map(hit => {
        return (
          <View key={hit.hit_set_id}>
            <Card
              onPress={() => {
                navigation.navigate('HitInfo', {hit});
              }}>
              <Card.Title
                title={
                  hit.title.length > 35
                    ? hit.title.substring(0, 35 - 3) + '...'
                    : hit.title
                }
                subtitle={
                  <Caption>
                    <Icon name="currency-usd" color={'green'} />
                    {hit.monetary_reward.amount_in_dollars.toFixed(2)}
                    <Icon name="arrow-bottom-right" color={'red'} />
                    {hit.requester_name}
                  </Caption>
                }
                right={inProps => (
                  <IconButton
                    {...inProps}
                    icon="chevron-right"
                    onPress={() => {
                      navigation.navigate('HitInfo', {hit});
                    }}
                  />
                )}
              />
              <Card.Content>
                <Caption>{hit.description}</Caption>
              </Card.Content>
            </Card>
          </View>
        );
      })}
    </View>
  );
};

export default ScrapeTable;
