import {StyleSheet} from 'react-native';
const scrapeScreenStyles = StyleSheet.create({
  view: {
    flex: 1,
    marginTop: 0,
  },
  buttons: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const hitStyles = StyleSheet.create({
  cardStyle: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 0,
    justifyContent: 'flex-start',
  },
  cardRight: {
    justifyContent: 'flex-start',
  },
  cardLeft: {
    justifyContent: 'flex-end',
    height: 20,
    width: 20,
  },
  cardTitle: {
    marginVertical: 0,
    marginBottom: 2,
  },
  cardSubtitle: {
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  cardContent: {
    flexDirection: 'row',
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 10,
  },
  moneyLabel: {
    fontSize: 16,
  },
  timeLabel: {
    fontSize: 16,
    marginLeft: 4,
  },
});

export {hitStyles, scrapeScreenStyles};
