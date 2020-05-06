import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {defaults, errorTypes, urls} from './common';
const cache = {};

const getHits = values => {
  const {reward, qualified, masters, to} = values;

  let url = `https://worker.mturk.com/?page_size=30&filters%5Bqualified%5D=${qualified}&filters%5Bmasters%5D=${masters}&sort=updated_desc&filters%5Bmin_reward%5D=${reward}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(response => {
        if (
          response.request &&
          response.request.responseURL.includes(urls.SIGNIN)
        ) {
          reject({type: errorTypes.LOGGED_OUT, code: null});
        }
        let res = response.data;
        if (to) {
          getTO(res.results)
            .then(hits => resolve(res.results))
            .catch(() => resolve(res.results));
        } else {
          resolve(res.results);
        }
      })
      .catch(getHitsError => {
        if (getHitsError.response) {
          console.log(getHitsError.response);
          reject({type: errorTypes.PRE, code: getHitsError.response.status});
        } else if (getHitsError.request) {
          reject({type: errorTypes.REQUEST, code: null});
        } else {
          console.log(getHitsError);
          reject({type: errorTypes.UNKNOWN, code: null});
        }
      });
  });
};

const getTO = hits => {
  let ids = [];
  hits.forEach(hit => {
    const isFound = ids.find(value => {
      return value.hit_set_id === hit.hit_set_id;
    });
    if (typeof isFound !== 'undefined') {
      hit.rating = cache[hit.requester_id];
    } else {
      ids.push(hit.requester_id);
    }
  });
  const url = `urls.TO${ids.toString()}`;
  return new Promise((resolve, reject) => {
    if (ids.length > 0) {
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then(response => {
          let res = response.data;
          hits.forEach(hit => {
            hit.rating = res[hit.requester_id];
            cache[hit.requester_id] = res[hit.requester_id];
          });
          resolve(hits);
        })
        .catch(() => {
          reject(hits);
        });
    } else {
      resolve(hits);
    }
  });
};

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

const getPayColor = pay => {
  return pay > 4 ? 'green' : pay > 3 ? 'yellow' : pay > 2 ? 'orange' : 'red';
};
const getPayIcon = pay => {
  return pay > 4
    ? 'arrow-up'
    : pay > 3
    ? 'arrow-top-right'
    : pay > 2
    ? 'arrow-bottom-right'
    : 'arrow-down';
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

const getRatingColor = rating => {
  return rating >= 4
    ? 'green'
    : rating >= 3
    ? 'yellow'
    : rating >= 2
    ? 'orange'
    : rating >= 1
    ? 'red'
    : 'grey';
};

export {
  getHits,
  filterTypes,
  getPayIcon,
  getPayColor,
  getRatingColor,
  storeValues,
  getValues,
};
