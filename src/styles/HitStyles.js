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
    justifyContent: 'flex-end',
    height: 25,
    width: 25,
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
    alignSelf: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    alignSelf: 'flex-end',
  },
});

export default styles;
