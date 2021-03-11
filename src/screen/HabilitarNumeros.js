import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {IconButton} from 'react-native-paper';
import {heightScreen, widthScreen} from '../style/global';

// database
import {
  EditarNumeroPuesto,
  EliminarNumeroPuesto,
  cargarNumeros_,
} from '../database/models/modelAjusteNumero';
//https://github.com/web-ridge/react-native-paper-dates
//https://github.com/n4kz/react-native-material-dropdown
//https://github.com/callstack/react-native-slider

const HabilitarNumeros = (props) => {
  const [numerosPuestos, setNumerosPuestos] = useState([]);
  useEffect(() => {
    cargarNumeros();

    return ()=>{
      setNumerosPuestos([]);
    }
  },[]);

  let cargarNumeros = () => {
    cargarNumeros_()
      .then((data) => {
        setNumerosPuestos(data);
      })
      .catch(() => {
        setNumerosPuestos([]);
      });
  };

  let handleClickState = (numero, puesto) => {
    EditarNumeroPuesto(numero, puesto)
      .then(() => {})
      .catch(() => {});
  };

  let handleClickDelete = (numero, puesto) => {
    EliminarNumeroPuesto(numero, puesto)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      <View style={styles.rect2}>
        <View style={styles.rect}>
          <Text>Habilitar Puesto</Text>
        </View>
        {numerosPuestos.map((item, i) => {
          return (
            <View style={{flexDirection: 'row'}} key={item.id}>
              <Text style={{marginTop: 10}}>Puesto: {item.Puesto} </Text>
              <Text style={{marginTop: 10}}>Numero: {item.numero} </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={item.estado ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  handleClickState(item.numero, item.Puesto);
                  props.navigation.navigate('Ajustes');
                }}
                value={item.estado}
              />
              <IconButton
                icon="delete"
                color="#004581"
                size={20}
                onPress={() => {
                  handleClickDelete(item.numero, item.Puesto);
                  props.navigation.navigate('Ajustes');
                }}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: widthScreen,
    height: heightScreen,
  },
  rect: {
    paddingTop: 20,
    height: heightScreen * 0.2 - 50,
    backgroundColor: 'rgb(250, 250, 250)',
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  text: {
    alignContent: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'rgb(250, 250, 250)',
    width: 200,
  },
  rect2: {
    height: heightScreen * 0.4 - 100,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rect3: {
    justifyContent: 'center',
    flexDirection: 'column',
    width: widthScreen - 40,
    height: 63,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  rect4: {
    width: widthScreen - 40,
    height: 63,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  rect5: {
    width: widthScreen - 40,
    height: 63,
    backgroundColor: 'rgb(250, 250, 250)',
  },
});

export default HabilitarNumeros;
