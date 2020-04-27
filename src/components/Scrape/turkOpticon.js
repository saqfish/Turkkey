// const toUrl = "https://turkoption.ucsd.edu/api";
// const path = "/multi-attrs.php";
const cache = {};

function getTO(hits) {
  let ids = [];
  hits.forEach(hit => {
    const isFound = ids.find(value => {
      return value.hit_set_id == hit.hit_set_id;
    });
    if (typeof isFound != 'undefined') hit.rating = cache[hit.requester_id];
    else ids.push(hit.requester_id);
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
}

export {getTO};
