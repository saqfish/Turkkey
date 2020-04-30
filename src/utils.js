// const toUrl = "https://turkoption.ucsd.edu/api";
// const path = "/multi-attrs.php";
import axios from 'axios';
const cache = {};

const getHits = to => {
  const qual = true;
  const masters = false;
  let url = `https://worker.mturk.com/?page_size=30&filters%5Bqualified%5D=${qual}&filters%5Bmasters%5D=${masters}&sort=updated_desc&filters%5Bmin_reward%5D=${1}`;
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

export {getHits};
