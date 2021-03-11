/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import MenuContainer from '../components/elements/MenuContainer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
//TODO
/*
  Mostrar las ventas de los numeros que se han hecho en los distintos puestos 
*/
//database
import {
  searchVentaByDate,
  VentasPorPuestoFecha,
} from '../database/models/ModelReporte';
import {CargarPuestos} from '../database/models/modelAuth';

export default function Ventas(props) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dataFecha, setDataFecha] = useState('');
  const [PuestoData, setPuestoData] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    cargarPuestos();
  }, []);

  const cargarPuestos = () => {
    let container = [];
    CargarPuestos()
      .then((item) => {
        item.map((data) => {
          let i = {label:data.Puesto, value:data.Puesto};
          container.push(i);
        });
        setPuestoData(container);
      })
      .catch((err) => {
        setPuestoData([]);
      });
  };

  let loadVentas = () => {
    VentasPorPuestoFecha(country.trim(), dataFecha.trim())
      .then((snap) => {
        setVentas(snap);
      })
      .catch(() => {
        console.log('err');
        setVentas([]);
      });
  };

  const handleSearch_ = () => {
    loadVentas();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDataFecha(
      ' ' +
        date.getDate() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getFullYear() +
        '',
    );
    hideDatePicker();
  };

  return (
    <View>
      <MenuContainer title={'Ventas de números'} {...props} />
      <View>
        <DropDownPicker
          items={PuestoData}
          placeholder={'Seleccione un puesto'}
          containerStyle={{height: 50}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={(item) => setCountry(item.value)}
        />
      </View>
      <View style={{marginTop: 150}}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            handleConfirm(date);
          }}
          onCancel={hideDatePicker}
        />
      </View>
      <View
        style={{
          position: 'relative',
          bottom: 0,
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <Button
          title="Ver fecha"
          style={{color: '#018abd'}}
          onPress={showDatePicker}
        />
        <Button
          title="Buscar Ventas"
          style={{color: '#018abd'}}
          onPress={() => {
            handleSearch_();
          }}
        />
      </View>
      <ScrollView>
        {ventas.length !== 0 ?
          ventas.map((item, i) => {
          return (
            <View style={{textAlign:'center', marginTop:20, marginLeft: 10}} key={item.ID}>
              <Text>Nombre Puesto: {item.nombrePuesto}</Text>
              <Text>Nombre Cliente: {item.nombre}</Text>
              <Text>Horario: {item.horarioLoto}</Text>
              <Text>Hora: {item.hora}</Text>
              {item.ticket.map((tick, i)=>{
                  return (
                    <View key={i, tick.id}>
                      <Text>Monto: {tick.monto}</Text>
                      <Text>Numero: {tick.monto}</Text>
                      <Text>Premio: {tick.monto}</Text>
                    </View>
                  )
              })}
            </View>
          );
        }):<Text style={{textAlign:'center', marginTop:20}}>No hay datos para mostrar</Text>}
      </ScrollView>
    </View>
  );
}
