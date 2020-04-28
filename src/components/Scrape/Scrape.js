import React, {useContext} from 'react';

import ScrapeTable from './ScrapeTable';

import {scrapeContext} from '../Context';

import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';

const Scrape = props => {
  const {scrape} = useContext(scrapeContext);
  const {scrapeState: data} = scrape;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {typeof data === 'undefined' || data.length < 1 ? null : (
          <ScrapeTable navigation={props.navigation} data={data} />
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
