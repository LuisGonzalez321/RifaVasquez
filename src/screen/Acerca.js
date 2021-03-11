import React from 'react';
import {View, Text} from 'react-native';
import MenuContainer from '../components/elements/MenuContainer';

export default function Acerca(props) {
  return (
    <View>
      <MenuContainer {...props} title={'Acerca de'} />
      <View style={{alignItems: 'center', bottom:0, top:50}}>
        <Text>Rifa Vasquez</Text>
        <Text>Todos los derechos reservados</Text>
        <Text>Elaborado por Luis Gabriel Gonzalez</Text>
      </View>
    </View>
  );
}
