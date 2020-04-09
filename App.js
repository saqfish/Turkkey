import React from 'react';
import {StatusBar, View, Text} from 'react-native';

const App = () => {
  // const [open, setOpen] = useState(false);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <View>
          <Text>Main view</Text>
        </View>
      </View>
    </>
  );
};

export default App;
