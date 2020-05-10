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

const getRatingIcon = (rating, max) => {
  let percent = Math.trunc((rating / max) * 100);
  return percent >= 80
    ? 'circle-slice-8'
    : percent >= 60
    ? 'circle-slice-6'
    : percent >= 40
    ? 'circle-slice-4'
    : percent >= 20
    ? 'circle-slice-2'
    : percent >= 10
    ? 'circle-slice-1'
    : 'circle-outline';
};
const getRatingColor = (rating, max) => {
  let percent = Math.trunc((rating / max) * 100);
  return percent >= 80
    ? 'green'
    : percent >= 60
    ? 'yellow'
    : percent >= 40
    ? 'orange'
    : percent >= 20
    ? 'red'
    : 'grey';
};
export {getTO, getRatingColor, getRatingIcon};
