import 'react-native-console-time-polyfill';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import AppBar from './../AppBar/AppBar.js';

import BackgroundTimer from 'react-native-background-timer';
import {getHits} from '../../utils';

import Hit from './Hit';

import {Button} from 'react-native-paper';

const Scrape = props => {
  const [scrape, setScrape] = useState([]);
  const [newHits, setNewHits] = useState([]);
  const [scraping, setScraping] = useState(false);

  const [filter, setFilter] = useState(0);
  const [interval, setInterval] = useState(null);

  const scrapeRef = useRef([]);
  const newHitsRef = useRef([]);

  const {navigation} = props;

  const filterTypes = type => {
    if (type > 3) {
      type = 0;
    }
    const types = {
      0: 'all',
      1: 'new',
      2: 'filter3',
      3: 'filter4',
    };
    return {label: types[type], type};
  };

  const runScrape = useCallback(() => {
    console.time('runScrape');
    setInterval(
      BackgroundTimer.setTimeout(async () => {
        let newHitsArray = [];
        try {
          const hits = await getHits(false)
            .then(res => {
              console.timeEnd('runScrape');
              res.forEach(hit => {
                hit.isNew = !scrapeRef.current.some(value => {
                  return value.hit_set_id === hit.hit_set_id;
                });
                if (hit.isNew) {
                  newHitsArray.unshift(hit);
                }
              });
              if (filter === 1) {
                let arr = [...newHitsArray, ...newHitsRef.current];
                if (arr.length > 30) {
                  let removeUntil = arr.length - 30;
                  arr.splice(30, removeUntil);
                }
                setNewHits(arr);
                return arr;
              }
              return res;
            })
            .catch(getHitsError => {
              console.log(`getHits Error: ${getHitsError}`);
              if (navigation.getRootState().index === 0) {
                /*error('Error getting data, are you loged in?', 'login').then(
                  () => navigation.navigationRef.current.navigate('WebView'),
                );*/
              }
            });
          setScrape(hits);
          if (scraping) {
            runScrape();
          }
        } catch (runScrapeError) {
          console.log(`runScrape Error: ${runScrapeError}`);
          setScrape(false);
        }
      }, 0),
    );
  }, [newHitsRef, scraping, filter, scrapeRef, setScrape, navigation]);

  useEffect(() => {
    if (scraping) {
      if (interval === null) {
        runScrape();
      }
    } else {
      BackgroundTimer.clearTimeout(interval);
      setInterval(null);
      setScraping(false);
    }
  }, [runScrape, scraping, interval]);

  useEffect(() => {
    scrapeRef.current = scrape;
  }, [scrape]);

  useEffect(() => {
    newHitsRef.current = newHits;
  }, [newHits]);

  /* useEffect(() => {
    return BackgroundTimer.clearTimeout(interval);
  }); */

  return (
    <SafeAreaView style={styles.container}>
      <AppBar navigation={navigation} />
      <Button
        icon={scraping ? 'stop-circle' : 'flash-circle'}
        mode="contained"
        onPress={() => (scraping ? setScraping(false) : setScraping(true))}
        disabled={(interval && !scraping) || (!interval && scraping)}>
        {scraping ? 'Stop' : 'Start'}
      </Button>
      <Button
        mode="contained"
        onPress={() => setFilter(filterTypes(filter + 1).type)}>
        {filterTypes(filter).label}
      </Button>
      <FlatList
        data={scrape}
        renderItem={({item}) => <Hit hit={item} navigation={navigation} />}
        keyExtractor={(item, index) => `${index}`}
        // extraData={selected}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  scrollView: {},
});

export default Scrape;
