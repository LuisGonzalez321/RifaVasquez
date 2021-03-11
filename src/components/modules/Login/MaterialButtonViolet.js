import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

function MaterialButtonViolet({style, title, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={()=>{onPress()}}>
      <Text style={styles.ingresar}>{title}</Text>
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
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
  ingresar: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MaterialButtonViolet;
