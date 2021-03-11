import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MaterialRightIconTextbox1(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        placeholder={props.inputStyle || ''}
        placeholderTextColor="rgba(1,138,189,1)"
        style={styles.inputStyle}
        value={props.value}
      />
      <Icon name={props.enabledIcon} style={styles.iconStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    color: 'rgba(1,138,189,1)',
    fontSize: 16,
    alignSelf: 'center',
    flex: 1,
    lineHeight: 16,
    textAlign: 'left',
    letterSpacing: 0,
    padding: 0,
    paddingRight: 0,
    width: 370,
    top: 0,
    height: 42,
  },
  iconStyle: {
    color: 'rgba(1,138,189,1)',
    fontSize: 24,
    paddingRight: 8,
  },
});

export default MaterialRightIconTextbox1;
