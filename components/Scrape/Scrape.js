import React, {useEffect, useContext} from 'react';

import ScrapeTable from './ScrapeTable';

import {scrapeContext} from '../Context';

import {View} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';

const ScrapeOptions = () => {
  const {scrape} = useContext(scrapeContext);
  useEffect(() => {
    // console.log(scrape);
  }, [scrape]);
  return (
    <View>
      {typeof scrape.results === 'undefined' ? (
        <ActivityIndicator animating={true} color={Colors.red800} />
      ) : (
        <ScrapeTable data={scrape.results} />
      )}
    </View>
  );
};

export default ScrapeOptions;
