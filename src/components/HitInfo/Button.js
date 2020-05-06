import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';

const Button = props => {
  const {title, onPress} = props;

  const {theme} = props;

  const style = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding: 5,
      margin: 3,
    },
    buttonLabel: {
      color: '#FFFFFF',
      padding: 5,
    },
  });
  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Subheading style={style.buttonLabel}>{title.toUpperCase()}</Subheading>
    </TouchableOpacity>
  );
};

export default withTheme(Button);
