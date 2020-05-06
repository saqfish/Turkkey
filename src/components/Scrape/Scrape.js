import 'react-native-console-time-polyfill';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {FlatList, SafeAreaView} from 'react-native';

import AppBar from './ScrapeAppBar.js';
import Button from './Button';
import {ScrapeStyles as styles} from '../../styles';

import moment from 'moment';

import BackgroundTimer from 'react-native-background-timer';

import {getHits} from '../../utils';
import {scrapeContext, snackBarContext} from '../Context';

import Hit from './Hit';

let interval = null;
const Scrape = props => {
  const [scrape, setScrape] = useState([]);
  const [newHits, setNewHits] = useState([]);
  const [scraping, setScraping] = useState(false);

  const error = useContext(snackBarContext);

  const context = useContext(scrapeContext);
  const {scrapeValues, settingsValues} = context;

  const {reward, rate, qualified, masters} = scrapeValues.scrapeValues;
  const {pre, to, filter} = settingsValues.settingsValues;

  const init = useRef(true);
  const scrapeRef = useRef([]);
  const newHitsRef = useRef([]);

  const {navigation} = props;
  const {name} = props.route;

  const runScrape = async () => {
    console.time({filter});
    console.time('runScrape');
    interval = BackgroundTimer.setTimeout(
      async () => {
        let newHitsArray = [];
        try {
          const hits = await getHits({reward, qualified, masters, to})
            .then(res => {
              res.forEach(hit => {
                hit.isNew = !scrapeRef.current.some(value => {
                  return value.hit_set_id === hit.hit_set_id;
                });
                if (hit.isNew) {
                  newHitsArray.unshift(hit);
                }
                hit.time = moment()
                  .format('hh:mm a')
                  .toString();
              });
              if (filter === 1) {
                // TODO: Magic number
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
                setScraping(false);
                error('Error getting data, are you loged in?', 'login').then(
                  () =>
                    navigation.navigate('WebView', {
                      uri: 'https://worker.mturk.com/dashboard',
                    }),
                );
              } else {
                switch (code) {
                  case 429: // PRE TODO: Magic number
                    setScrape(scrapeRef.current);
                    if (pre) {
                      BackgroundTimer.setTimeout(() => {
                        setScraping(true);
                      }, 2000);
                    } else {
                      setScraping(false);
                    }
                    break;
                }
              }
              setScrape(scrapeRef.current);
            });
          setScrape(hits);
          if (scraping && interval != null) {
            runScrape();
          }
        } catch (runScrapeError) {
          setScrape(scrapeRef.current);
          console.log(`runScrape Error: ${runScrapeError}`);
          setScraping(false);
        }
      },
      interval !== null ? rate * 1000 : 0,
    );
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
      }
    }
  }, [scraping]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof scrape !== 'undefined') {
      scrapeRef.current = scrape;
    }
    if (typeof newHits !== 'undefined') {
      newHitsRef.current = newHits;
    }
  }, [scrape, newHits]);

  useEffect(() => {
    return () => {
      setScraping(false);
      BackgroundTimer.clearTimeout(interval);
      interval = null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <AppBar navigation={navigation}>
        <Button
          title={scraping ? 'Stop' : 'Start'}
          icon={scraping ? 'stop-circle' : 'flash-circle'}
          disabled={!interval && scraping}
          loading={!interval && scraping}
          onPress={() => (scraping ? setScraping(false) : setScraping(true))}
        />
      </AppBar>
      <FlatList
        data={scrape}
        renderItem={({item}) => <Hit hit={item} navigation={navigation} />}
        keyExtractor={(item, index) => `${index}`}
        initialNumToRender={30}
        onPress={() => runScrape()}
        refreshing={false}
      />
    </SafeAreaView>
  );
};

export default Scrape;
