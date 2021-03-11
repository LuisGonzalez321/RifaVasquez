import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Ajustes from '../screen/Ajustes';
import AjusteNumeros from '../screen/AjustesNumeros';
import AjustesHoraCierre from '../screen/AjustesHoraCierre';
import HabilitarNumeros from '../screen/HabilitarNumeros';

const Stack = createStackNavigator();

const NavigationSettings = () => {
  return (
    <Stack.Navigator initialRouteName="Ajustes">
      <Stack.Screen
        name={'Ajustes'}
        options={{headerShown: false}}
        component={Ajustes}
      />
      <Stack.Screen name={'AjustesNumeros'} component={AjusteNumeros} />
      <Stack.Screen name={'AjustesHoraCierre'} component={AjustesHoraCierre} />
      <Stack.Screen name={'HabilitarNumeros'} component={HabilitarNumeros} />
    </Stack.Navigator>
  );
};

export default NavigationSettings;
