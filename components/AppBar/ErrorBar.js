import React from 'react';
import {Snackbar} from 'react-native-paper';

const ErrorBar = props => {
  const {visible, onDismiss, text, action} = props;
  return (
    <Snackbar
      style={{backgroundColor: 'red'}}
      visible={visible}
      onDismiss={onDismiss}
      action={action}>
      {text}
    </Snackbar>
  );
};
export default ErrorBar;
