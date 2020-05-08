import axios from 'axios';
import {urls} from '@common';

const cache = {};

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
  const url = `${urls.TO}${ids.toString()}`;
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

const getPayColor = pay => {
  return pay >= 5
    ? 'green'
    : pay >= 4
    ? 'green'
    : pay >= 3
    ? 'yellow'
    : pay >= 2
    ? 'orange'
    : pay >= 1
    ? 'red'
    : 'grey';
};
const getPayIcon = pay => {
  return pay >= 5
    ? 'circle-slice-8'
    : pay >= 4
    ? 'circle-slice-7'
    : pay >= 3
    ? 'circle-slice-5'
    : pay >= 2
    ? 'circle-slice-3'
    : pay >= 1
    ? 'circle-slice-1'
    : 'circle-outline';
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
export {getTO, getPayIcon, getPayColor, getRatingColor};
