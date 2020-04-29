// const toUrl = "https://turkoption.ucsd.edu/api";
// const path = "/multi-attrs.php";
const cache = {};

const getHits = to => {
  const qual = true;
  const masters = false;
  let url = `https://worker.mturk.com/?page_size=20&filters%5Bqualified%5D=${qual}&filters%5Bmasters%5D=${masters}&sort=updated_desc&filters%5Bmin_reward%5D=${0.0}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error();
        }
      })
      .then(res => {
        getTO(res.results)
          .then(hits => resolve(res.results))
          .catch(() => resolve(res.results));
      })
      .catch(getHitsError => {
        console.log(`getHits Error: ${getHitsError}`);
        reject('getHits');
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
      fetch(url)
        .then(res => res.json())
        .then(res => {
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
