import {createContext} from 'react';

export const snackBarContext = createContext([]);
export const scrapeContext = createContext({
  rate: 1,
  reward: 0,
  qualified: false,
  masters: false,
});
export const settingsContext = createContext({});
