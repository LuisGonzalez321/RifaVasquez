import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

export default function ButtonFloat(props) {
  return (
    <FAB
      animated="true"
      color="#fff"
      style={styles.fab}
      icon="plus"
      onPress={() => {
        props.navigation.navigate('MainTicket');
      }}
    />
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#97cbdc',
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 650,
  },
});
