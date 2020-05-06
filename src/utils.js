// const toUrl = "https://turkoption.ucsd.edu/api";
// const path = "/multi-attrs.php";
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {defaults} from './common';
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
          response.request.responseURL.includes(
            'https://www.amazon.com/ap/signin',
          )
        ) {
          reject({type: 0, code: null}); // type 0 = logged out, TODO: Magic number
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
          reject({type: 1, code: getHitsError.response.status}); // type 1 = Pre error , TODO: Magic number
        } else if (getHitsError.request) {
          reject({type: 2, code: null}); // type 1 = , TODO: Magic number
        } else {
          console.log(getHitsError);
          reject({type: 9, code: null}); // type 1 = unknown, TODO: Magic number
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
  const url = `https://turkopticon.ucsd.edu/api/multi-attrs.php?ids=${ids.toString()}`;
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
export {getHits, filterTypes, getPayIcon, getPayColor, storeValues, getValues};
