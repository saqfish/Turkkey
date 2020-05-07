import axios from 'axios';
import {errorTypes, urls} from '@common';
import {getTO} from './to.utils';
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

export {getHits};
