import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';
import MenuContainer from '../components/elements/MenuContainer';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  RecaudacionPorFechaPuesto,
  MontoPagadoPorFechaPuesto,
} from '../database/models/ModelReporte';
import {CargarPuestos} from '../database/models/modelAuth';
//TODO
//Mostrar el numero mas vendido por fecha,
//Venta total de cada turno
//Mostrar Ganadores
//Numero con el que mas juegan

/*
  Puesto-Fecha

  Horario | MontoTotal | Pagado | Total
  Mañana  |   1230     |    0   | 1230
  Tarde   |   1230     |    0   | 1230
  Noche   |   1230     |    0   | 1230
  -------------------------------------
  Total   |   4564     |    0   | 4552    

  Horario     Mañana Tarde Noche 
  MontoTotal
  Pagado
  Total

*/

export default function Reporte(props) {
  const [country, setCountry] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [PuestoData, setPuestoData] = useState([]);
  const [dataFecha, setDataFecha] = useState('');
  const [ingreso, setIngreso] = useState([]);
  const [gasto, setGasto] = useState([]);

  useEffect(() => {
    cargarPuestos_();
  }, [ingreso]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let fecha =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    setDataFecha(fecha);
    hideDatePicker();
  };

  const handleClickSearch = () => {
    RecaudacionPorFechaPuesto(dataFecha, country)
      .then((data) => {
        setIngreso(data);
      })
      .catch(() => {});
    MontoPagadoPorFechaPuesto(dataFecha, country)
      .then((data) => {
        setGasto(data);
      })
      .catch(() => {});
  };

  let f = new Date();

  const cargarPuestos_ = () => {
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

  let sumIngreso = [0,0,0];
  let sumGasto = [0,0,0];


  return (
    <View>
      <MenuContainer {...props} title={'Reporte'} />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 10,
          fontSize: 20,
          color: '#001b48',
        }}>
        Reporte de ventas en los puestos
      </Text>
      <View style={styles.containerSelected}>
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
        <Button title="Fecha" onPress={showDatePicker} />
        <Button
          title="Buscar"
          onPress={() => {
            handleClickSearch();
          }}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <ScrollView style={{marginTop: 140, marginLeft: 10, marginRight: 10}}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Horario</DataTable.Title>
            {ingreso.map((item_, i) => {
              return (
                <DataTable.Title key={i}>
                  {item_.horario}
                </DataTable.Title>
              );
            })}
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Monto</DataTable.Cell>
            {ingreso.map((item, i) => {
              sumIngreso[i] = parseInt(item.monto);
              return <DataTable.Cell key={i}>{item.monto}</DataTable.Cell>;
            })}
          </DataTable.Row>

          <DataTable.Row >
            <DataTable.Cell>Pagado</DataTable.Cell>
            {gasto.map((item, i) => {
              sumGasto[i] = parseInt(item.monto);
              return <DataTable.Cell key={i}>{item.monto}</DataTable.Cell>;
            })}
          </DataTable.Row>

          <DataTable.Row style={styles.Row}>
            <DataTable.Cell>
              <Text style={styles.text}>Total</Text>
            </DataTable.Cell>
            {gasto.map((item, i) => {
              return <DataTable.Cell key={i}>{sumIngreso[i] - sumGasto[i]}</DataTable.Cell>;
            })}
          </DataTable.Row>

        </DataTable>
        <View></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#332E2E',
    height: 36,
  },
  text2: {
    color: '#001b48',
    fontSize: 16,
  },
  Row: {
    backgroundColor: '#97cbdc',
  },
  containerSelected: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dropdown: {
    backgroundColor: 'rgb(250, 250, 250)',
    width: 200,
  },
});
