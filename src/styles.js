import {StyleSheet} from 'react-native';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';

const fonts = {
  regular: {
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: '300',
  },
  medium: {
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: '300',
  },
  light: {
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: '300',
  },
  thin: {
    fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: '300',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {...DarkTheme.colors, accent: '#000000', primary: '#424242'},
  fonts,
  animation: {
    scale: 1.0,
  },
};
const lightTheme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, accent: '#000000', primary: '#fff'},
  fonts,
  animation: {
    scale: 1.0,
  },
};
const styles = StyleSheet.create({
  headerContainer: {
    //backgroundColor: theme.colors.primary,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLabel: {
    //color: theme.colors.text,
    color: 'black',
    fontSize: 20,
  },
});
export {styles, darkTheme, lightTheme};
