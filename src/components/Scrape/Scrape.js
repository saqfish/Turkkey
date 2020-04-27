import React, {useEffect, useContext} from 'react';

import ScrapeTable from './ScrapeTable';

import {scrapeContext} from '../Context';

import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';

const Scrape = props => {
  const {scrape} = useContext(scrapeContext);
  useEffect(() => {
    // console.log(scrape);
  }, [scrape]);
  return (
    <SafeAreaView style={styles.container}>
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
