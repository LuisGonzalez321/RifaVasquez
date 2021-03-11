import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Alert} from 'react-native';
import {Provider} from 'react-native-paper';

import {searchTokenAndvalidate} from '../../database/models/modelAuth';

import ContentLogin from '../../components/modules/Login/ContentLogin';
import MaterialRightIconTextbox1 from '../../components/modules/Login/MaterialRightIconTextbox1';
import MaterialButtonViolet from '../../components/modules/Login/MaterialButtonViolet';

const LoginUser = (props) => {
  const [token, setToken] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleToken = () => {
    searchTokenAndvalidate(token)
      .then((data) => {
        setIsValid(data);
        if (isValid === true) {
          setTimeout(() => {
            Alert.alert('Token correcto');
          }, 1000);
          props.navigation.navigate('MainPrincipal');
        } else {
          setIsValid(data);
          Alert.alert(
            'Error con el token pongase en contacto con los administradores',
          );
        }
      })
      .catch((err) => {
        console.warn('token invalido', 'state ' + isValid, 'value data ' + err);
      });
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <ContentLogin title="Crear nueva cuenta" />
        <View style={styles.rect}>
          <View style={styles.materialRightIconTextbox2Column}>
            <MaterialRightIconTextbox1
              enabledIcon="lock"
              onChangeText={(text) => setToken(text)}
              value={token}
              inputStyle="Token"
              secureTextEntry={false}
              style={styles.materialRightIconTextbox2}
            />
          </View>
          <MaterialButtonViolet
            title="Aceptar"
            style={styles.materialButtonViolet}
            {...props}
            onPress={() => handleToken()}
          />
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rect: {
    height: 370,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  materialRightIconTextbox2: {
    height: 43,
    width: 266,
  },
  materialRightIconTextbox1: {
    height: 43,
    width: 266,
    marginTop: 36,
  },
  materialRightIconTextbox2Column: {
    width: 266,
    marginTop: 20,
    alignSelf: 'center',
  },
  materialRightIconTextbox2ColumnFiller: {
    flex: 1,
    justifyContent: 'center',
  },
  textError: {
    color: 'red',
    fontSize: 18,
    alignSelf: 'center',
  },
  materialButtonViolet: {
    height: 36,
    width: 303,
    backgroundColor: 'rgba(1,138,189,1)',
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default LoginUser;
