import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MaterialButtonHamburger({style, number, onPress}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={number} style={styles.caption} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
  },
  caption: {
    color: '#fff',
    fontSize: 33,
  },
});

export default MaterialButtonHamburger;
