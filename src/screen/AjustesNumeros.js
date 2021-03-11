import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';
import {heightScreen, widthScreen} from '../style/global';
import {Button} from 'react-native-paper';

//database
import {
  ValidarNumero,
  AgregarNumero,
  EditarNumeroPuesto,
  EliminarNumeroPuesto,
} from '../database/models/modelAjusteNumero';
import {CargarPuestos} from '../database/models/modelAuth';

//https://github.com/web-ridge/react-native-paper-dates
//https://github.com/n4kz/react-native-material-dropdown
//https://github.com/callstack/react-native-slider

const AjusteNumeros = (props) => {
  const [PuestoData, setPuestoData] = useState([]);

  useEffect(() => {
    cargarPuestos();

    return () => {
      setPuestoData([]);
      setCountry('');
    };
  }, []);

  const cargarPuestos = () => {
    let container = [];
    CargarPuestos()
      .then((item) => {
        item.map((data) => {
          let i = {label: '' + data.Puesto, value: '' + data.Puesto};
          container.push(i);
        });
        setPuestoData(container);
      })
      .catch((err) => {
        setPuestoData([]);
      });
  };

  let f = new Date();

  const [country, setCountry] = useState('admin');
  const [number_1, setNumber_1] = useState(0);
  const [number_2, setNumber_2] = useState(0);

  const handleAgregarNumero = (number) => {
    let fecha = f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear();
    let hora = f.getHours() + ':' + f.getMinutes();
    AgregarNumero({
      Puesto: country,
      estado: true,
      fecha: fecha,
      hora: hora,
      numero: number,
    })
      .then(() => {})
      .catch(() => {});
  };
  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <Text style={styles.text}>Puesto</Text>
        <DropDownPicker
          items={PuestoData}
          placeholder={'Seleccione un puesto'}
          containerStyle={{height: 50}}
          style={styles.dropdown}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setCountry(item.value)}
        />
      </View>
      <View style={styles.rect2}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>{number_1}</Text>
          <Text style={styles.text}>{number_2}</Text>
        </View>
        <View style={styles.rect3}>
          <Slider
            style={{width: widthScreen - 40, height: 40}}
            minimumValue={0}
            maximumValue={9}
            onValueChange={(value) => setNumber_1(parseInt(value))}
            minimumTrackTintColor="#018abd"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles.rect4}>
          <Slider
            style={{width: widthScreen - 40, height: 40}}
            minimumValue={0}
            maximumValue={9}
            onValueChange={(value) => setNumber_2(parseInt(value))}
            minimumTrackTintColor="#018abd"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View style={styles.rect5}>
          <Button
            mode="contained"
            color="#018abd"
            onPress={() => {
              handleAgregarNumero(number_1+''+number_2);
              props.navigation.navigate('Ajustes');
            }}>
            Restringir numero
          </Button>
        </View>
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
    paddingTop: 60,
    height: heightScreen * 0.4 - 50,
    backgroundColor: 'rgb(250, 250, 250)',
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  text: {
    marginTop: 10,
    alignContent: 'center',
    fontSize: 25,
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: 'rgb(250, 250, 250)',
    width: 200,
  },
  rect2: {
    marginTop: 50,
    height: heightScreen * 0.6 - 100,
    backgroundColor: 'rgb(250, 250, 250)',
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

export default AjusteNumeros;
