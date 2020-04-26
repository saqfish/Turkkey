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
  colors: {
    ...DarkTheme.colors,
    primary: '#363640',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    text: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
  },
  fonts,
  animation: {
    scale: 1.0,
  },
};
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
  },
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
