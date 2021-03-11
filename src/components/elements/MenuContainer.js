import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

const MenuContainer = (props) => {
  const openDrawer = () => props.navigation.openDrawer();

  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Action icon="menu" color={'#018abd'} onPress={openDrawer} />
      <Appbar.Content color={'#018abd'} title={props.title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  icon: {
    color: '#018abd',
  },
});

export default MenuContainer;
