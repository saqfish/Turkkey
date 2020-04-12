import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

import QueueTable from './QueueTable';

const Queue = () => {
  console.log('Queue');
  const [queueData, setQueueData] = useState();
  const getQueueData = () => {
    console.log('fetching...');
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
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useFocusEffect(
    useCallback(() => {
      getQueueData();
    }, []),
  );

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
