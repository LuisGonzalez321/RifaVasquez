import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import StackAuthUser from './src/navigation/StackAuthUser';
import {View, Text, Button} from 'react-native';

import BLEPrint from './src/components/modules/Printer/BLEPrint_';

let user = [
  {
    monto: '23',
    premio: '1000',
  },
  {
    monto: '23',
    premio: '1000',
  },
];

let impresion = `${user.map((item) => {
  'item.monto';
})}`;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackAuthUser />
      </NavigationContainer>
    </Provider>
  );
};

/*
<Provider store={store}>
      <NavigationContainer>
        <StackAuthUser />
      </NavigationContainer>
    </Provider>

    <View>
      <Text>Helo {impresion} si</Text>
      <BLEPrint onAction={agregarTicket} Ticket={'<C>sample text</C>'}/>
    </View>
*/

export default App;
