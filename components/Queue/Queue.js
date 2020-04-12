import React, {useState, useEffect} from 'react';

import {View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

import QueueTable from './QueueTable';

const Queue = props => {
  console.log('Queue');
  const {navigation} = props;
  const [queueData, setQueueData] = useState();
  const getQueueData = () => {
    let url = 'https://worker.mturk.com/tasks.json';
    fetch(`${url}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setQueueData(res.tasks);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log('fetching...');
      getQueueData();
    });
  }, [navigation]);

  useEffect(() => {
    console.log(queueData);
  }, [queueData]);

  return (
    <View>
      {typeof queueData === 'undefined' ? (
        <ActivityIndicator animating={true} color={Colors.red800} />
      ) : (
        <QueueTable data={queueData} />
      )}
    </View>
  );
};

export default Queue;
