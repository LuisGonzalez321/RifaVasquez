import * as React from 'react';
import {Text, View} from 'react-native';

import MenuContainer from '../components/elements/MenuContainer';
import ButtonFloat from '../components/modules/ButtonFloat';

export default function MainPrincipal(props) {
  return (
    <View>
      <MenuContainer {...props} title={'Inicio'} />
      <Text style={{textAlign:'center', marginTop: 20}}>Hola Bienvendi@</Text>
      <ButtonFloat {...props} />
    </View>
  );
}
