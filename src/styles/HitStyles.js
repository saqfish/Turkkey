import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardStyle: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: 'flex-start',
  },
  cardRight: {
    justifyContent: 'flex-end',
  },
  cardLeft: {
    opacity: 0.87,
    justifyContent: 'flex-end',
    marginRight: 10,
    height: 35,
    width: 35,
  },
  cardTitle: {
    opacity: 0.87,
    marginVertical: 0,
    marginBottom: 2,
  },
  cardSubtitle: {
    opacity: 0.6,
    justifyContent: 'flex-start',
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
    alignSelf: 'flex-end',
  },
  timeLabel: {
    opacity: 0.6,
    fontSize: 14,
    alignSelf: 'flex-end',
    paddingLeft: 2,
  },
});

export default styles;
