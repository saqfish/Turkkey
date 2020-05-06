import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Subheading, withTheme} from 'react-native-paper';

const Button = props => {
  const {title, disabled, onPress} = props;

  const {theme} = props;

  const style = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding: 3,
    },
    buttonLabel: {
      color: '#FFFFFF',
      opacity: disabled ? 0.3 : 1,
      padding: 3,
    },
  });
  return (
    <TouchableOpacity style={style.button} onPress={onPress}>
      <Subheading style={style.buttonLabel}>{title.toUpperCase()}</Subheading>
    </TouchableOpacity>
  );
};

export default withTheme(Button);
