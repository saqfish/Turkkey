import 'react-native-console-time-polyfill';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet, SafeAreaView} from 'react-native';
import AppBar from './../AppBar/AppBar.js';

import BackgroundTimer from 'react-native-background-timer';
import {getHits} from '../../utils';

import Hit from './Hit';

import {Button} from 'react-native-paper';

let interval = null;
const Scrape = props => {
  const [scrape, setScrape] = useState([]);
  const [newHits, setNewHits] = useState([]);
  const [scraping, setScraping] = useState(false);
  let isMounted = true;

  const [filter, setFilter] = useState(0);

  const init = useRef(true);
  const scrapeRef = useRef([]);
  const newHitsRef = useRef([]);

  const {navigation} = props;
  const {name} = props.route;

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

  const runScrape = async () => {
    console.time('runScrape');
    interval = BackgroundTimer.setTimeout(async () => {
      console.log(`runScrape: ${scraping} - Interval: ${interval}`);
      let newHitsArray = [];
      try {
        const hits = await getHits(false)
          .then(res => {
            res.forEach(hit => {
              hit.isNew = !scrapeRef.current.some(value => {
                return value.hit_set_id === hit.hit_set_id;
              });
              if (hit.isNew) {
                let d = new Date();
                hit.time = d.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                });

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
              console.timeEnd('runScrape');
              return arr;
            }
            console.timeEnd('runScrape');
            return res;
          })
          .catch(getHitsError => {
            console.log('getHits Error: ');
            console.log(getHitsError);
            const {type, code} = getHitsError;
            if (name === 'Scrape' && type === 0) {
              console.log('Logged out error');
              // setScraping(false);
              /*error('Error getting data, are you loged in?', 'login').then(
                  () => navigation.navigationRef.current.navigate('WebView'),
                );*/
            } else {
              switch (code) {
                case 429: // PRE TODO: Magic number
                  setScrape(scrapeRef.current);
                  setScraping(false);
                  break;
              }
            }
            setScrape(scrapeRef.current);
          });
        setScrape(hits);
        if (scraping && interval != null) {
          if (isMounted) {
            runScrape();
          }
        }
      } catch (runScrapeError) {
        setScrape(scrapeRef.current);
        console.log(`runScrape Error: ${runScrapeError}`);
        setScraping(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (init.current) {
      init.current = false;
    } else {
      if (scraping) {
        console.log('Scrape: starting');
        runScrape();
      } else {
        console.log(`Scrape: stoping interval ${interval}`);
        BackgroundTimer.clearTimeout(interval);
        interval = null;
        // setScrape([]);
      }
    }
  }, [scraping]);

  useEffect(() => {
    if (typeof scrape !== 'undefined') {
      scrapeRef.current = scrape;
    }
  }, [scrape]);

  useEffect(() => {
    if (typeof newHits !== 'undefined') {
      newHitsRef.current = newHits;
    }
  }, [newHits]);

  useEffect(() => {
    return () => {
      setScraping(false);
      BackgroundTimer.clearTimeout(interval);
      interval = null;
      isMounted = false;
    };
  }, []);

  const startScrape = () => {
    if (!scraping && interval === null) {
      setScraping(true);
    }
  };
  const stopScrape = () => {
    setScraping(false);
  };
  // disabled={(interval && !scraping) || (!interval && scraping)}>
  return (
    <SafeAreaView style={styles.container}>
      <AppBar navigation={navigation} />
      <Button
        icon={scraping ? 'stop-circle' : 'flash-circle'}
        mode="contained"
        onPress={() => (scraping ? stopScrape() : startScrape())}>
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
        initialNumToRender={30}
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
