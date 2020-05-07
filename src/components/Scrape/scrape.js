import 'react-native-console-time-polyfill';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';

import {getHits} from '@utils';
import {scrapeErrors, filters} from '@common';

let interval = null;
const runScrape = async values => {
  const {scrapeValues, settingsValues, refs, methods, misc} = values;
  const {setNewHits, setScraping, setScrape} = methods;
  const {scrapeRef, newHitsRef} = refs;
  const {reward, rate, qualified, masters} = scrapeValues;
  const {pre, to, filter} = settingsValues;
  const {scraping, name, error, navigation} = misc;

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
            if (filter === filters.NEW) {
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
              error('Error getting data, are you loged in?', 'login').then(() =>
                navigation.navigate('WebView', {
                  uri: 'https://worker.mturk.com/dashboard',
                }),
              );
            } else {
              switch (code) {
                case scrapeErrors.PRE:
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
          runScrape(values);
        }
      } catch (runScrapeError) {
        setScrape(scrapeRef.current);
        console.log(`runScrape Error: ${runScrapeError}`);
        setScraping(false);
      }
    },
    interval !== null ? rate * 1000 : 0,
  );
  return interval;
};

const startScrape = () => {};
const stopScrape = () => {
  BackgroundTimer.clearTimeout(interval);
  interval = null;
};
export {runScrape, stopScrape, startScrape};
