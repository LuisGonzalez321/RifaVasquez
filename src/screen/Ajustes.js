import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import MenuContainer from '../components/elements/MenuContainer';
import {Button} from 'react-native-paper';

import {widthScreen} from '../style/global';

export default function Ajustes(props) {
  return (
    <View>
      <MenuContainer {...props} title={'Ajustes'} />
      <View>
        <Container {...props} />
      </View>
    </View>
  );
}

const DATA = [
  {
    id: '1',
    title: 'Deshabilitar Numeros a puestos',
    navigation_: 'AjustesNumeros',
  },
  {
    id: '2',
    title: 'Editar hora de cierre de la aplicacion',
    navigation_: 'AjustesHoraCierre',
  },
  {
    id: '3',
    title: 'Habilitar Números a puestos',
    navigation_: 'HabilitarNumeros',
  },
];

const Item = (props) => (
  <View style={styles.item}>
    <Button
      mode="text"
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: widthScreen,
      }}
      color="#018abd"
      onPress={() => props.navigation.navigate(props.navigation_)}>
      {props.id + ' - ' + props.title}
    </Button>
  </View>
);

const Container = (props) => {
  const renderItem = ({item}) => (
    <Item
      {...props}
      navigation_={item.navigation_}
      id={item.id}
      title={item.title}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
  },
  item: {
    width: widthScreen,
    marginVertical: 10,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 25,
  },
});
