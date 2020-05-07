import React, {useContext, useEffect, useState, useRef} from 'react';
import {FlatList, SafeAreaView} from 'react-native';

import AppBar from './ScrapeAppBar.js';
import Button from './Button';
import {ScrapeStyles as styles} from '@styles';

import {scrapeContext, snackBarContext} from '../Context';

import Hit from './Hit';
import {runScrape, stopScrape} from './scrape';

const Scrape = props => {
  const [scrape, setScrape] = useState([]);
  const [newHits, setNewHits] = useState([]);
  const [scraping, setScraping] = useState(false);

  const context = useContext(scrapeContext);
  const {scrapeValues, settingsValues} = context;

  const init = useRef(true);
  const scrapeRef = useRef([]);
  const newHitsRef = useRef([]);

  const error = useContext(snackBarContext);
  const {navigation} = props;
  const {name} = props.route;

  const getParams = () => {
    return {
      scrapeValues: {...scrapeValues.scrapeValues},
      settingsValues: {...settingsValues.settingsValues},
      refs: {
        scrapeRef,
        newHitsRef,
      },
      methods: {
        setScraping,
        setNewHits,
        setScrape,
      },
      misc: {
        scraping,
        name,
        error,
        navigation,
      },
    };
  };

  useEffect(() => {
    if (init.current) {
      init.current = false;
    } else {
      if (scraping) {
        console.log('Scrape: starting');
        runScrape(getParams());
      } else {
        console.log('Scrape: stoping');
        stopScrape();
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
      stopScrape();
    };
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <AppBar navigation={navigation}>
        <Button
          title={scraping ? 'Stop' : 'Start'}
          icon={scraping ? 'stop-circle' : 'flash-circle'}
          // disabled={!interval && scraping}
          // loading={!interval && scraping}
          onPress={() => (scraping ? setScraping(false) : setScraping(true))}
        />
      </AppBar>
      <FlatList
        data={scrape}
        renderItem={({item}) => <Hit hit={item} navigation={navigation} />}
        keyExtractor={(item, index) => `${index}`}
        initialNumToRender={30}
        refreshing={false}
      />
    </SafeAreaView>
  );
};

export default Scrape;
