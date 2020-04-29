import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {getHits} from '../../utils';

import ScrapeTable from './ScrapeTable';

import {Button} from 'react-native-paper';

import {useIsDrawerOpen} from '@react-navigation/drawer';

const Scrape = props => {
  console.log('Scrape Render');
  const [scrape, setScrape] = useState([]);
  const [newHits, setNewHits] = useState([]);
  const [scraping, setScraping] = useState(false);
  const isDrawerOpen = useIsDrawerOpen();

  const [filter, setFilter] = useState(0);
  const [interval, setInterval] = useState(null);

  const scrapeRef = useRef(null);
  const newHitsRef = useRef(null);

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

  const runScrape = () => {
    setInterval(
      BackgroundTimer.setTimeout(async () => {
        console.log(`isDrawerOpen: ${isDrawerOpen}`);
        let newHitsArray = [];
        setScraping(true);
        try {
          const hits = await getHits(false)
            .then(res => {
              res.forEach(hit => {
                hit.isNew = !scrapeRef.current.some(value => {
                  return value.hit_set_id === hit.hit_set_id;
                });
                if (hit.isNew) {
                  newHitsArray.push(hit);
                }
              });
              if (filter === 1) {
                let arr = [...newHitsRef.current, ...newHitsArray];
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
          console.log(`hits length: ${hits.length}`);
          setScrape(hits);
          runScrape();
        } catch (runScrapeError) {
          console.log(`runScrape Error: ${runScrapeError}`);
          stopScrape();
        }
      }, 1000),
    );
  };
  useEffect(() => {
    scrapeRef.current = scrape;
  }, [scrape]);

  useEffect(() => {
    newHitsRef.current = newHits;
  }, [newHits]);

  /* useEffect(() => {
    return BackgroundTimer.clearTimeout(interval);
  }); */

  const stopScrape = () => {
    BackgroundTimer.clearTimeout(interval);
    setInterval(null);
    setScraping(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        icon={scraping ? 'stop-circle' : 'flash-circle'}
        mode="contained"
        onPress={() => (scraping ? stopScrape() : runScrape())}
        disabled={(interval && !scraping) || (!interval && scraping)}>
        {scraping ? 'Stop' : 'Start'}
      </Button>
      <Button
        mode="contained"
        onPress={() => setFilter(filterTypes(filter + 1).type)}>
        {filterTypes(filter).label}
      </Button>
      <ScrollView style={styles.scrollView}>
        {typeof scrape === 'undefined' || scrape.length < 1 ? null : (
          <ScrapeTable navigation={props.navigation} data={scrape} />
        )}
      </ScrollView>
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
