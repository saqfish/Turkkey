const defaults = {
  scrape: {
    reward: 1,
    rate: 1,
    qualified: true,
    masters: false,
  },
  settings: {
    dark: true,
    filter: 0,
    quckMenu: true,
    pre: true,
    to: true,
  },
};

const scrapeErrors = {
  PRE: 429,
};

const errorTypes = {
  LOGGED_OUT: 0,
  PRE: 1,
  REQUESt: 2,
  UNKNOWN: 9,
};
const filters = {
  ALL: 0,
  NEW: 1,
};

const urls = {
  SIGNIN: 'https://www.amazon.com/ap/signin',
  TO: 'https://turkopticon.ucsd.edu/api/multi-attrs.php?ids=',
};

export {defaults, scrapeErrors, errorTypes, urls, filters};
