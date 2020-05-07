import AsyncStorage from '@react-native-community/async-storage';
import {defaults} from '@common';

const filterTypes = type => {
  if (type > 1) {
    type = 0;
  }
  const types = {
    0: 'all',
    1: 'new',
  };
  return {label: types[type], type};
};

const storeValues = async values => {
  const {scrapeValues, settingsValues} = values;
  try {
    await AsyncStorage.setItem('scrapeValues', JSON.stringify(scrapeValues));
    await AsyncStorage.setItem(
      'settingsValues',
      JSON.stringify(settingsValues),
    );
  } catch (storeError) {
    console.log(storeError);
  }
};

const getValues = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const newScrapeValues = await AsyncStorage.getItem('scrapeValues');
      const newSettingsValues = await AsyncStorage.getItem('settingsValues');

      let scrapeValues;
      let settingsValues;

      if (newScrapeValues !== null) {
        scrapeValues = JSON.parse(newScrapeValues);
      } else {
        scrapeValues = defaults.scrape;
      }
      if (newScrapeValues !== null) {
        settingsValues = JSON.parse(newSettingsValues);
      } else {
        settingsValues = defaults.settings;
      }
      resolve({scrape: scrapeValues, settings: settingsValues});
    } catch (getError) {
      console.log(getError);
      reject({
        scrape: defaults.scrapeValues,
        settings: defaults.settingsValues,
      });
    }
  });
};

export {storeValues, getValues, filterTypes};
