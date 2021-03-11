import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Button} from 'react-native';
import {
  Portal,
  Provider,
  Dialog,
  Paragraph,
  Button as ButtonPaper,
} from 'react-native-paper';
import {widthScreen} from '../style/global';
import MenuContainer from '../components/elements/MenuContainer';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextInput from '../components/modules/Login/MaterialRightIconTextbox1';

import {
  RegistrarGanador,
  mostrarGanadores,
} from '../database/models/modelGanador';

//redux
import {connect} from 'react-redux';
import AuthenticationReducer from '../redux/reducer/AuthReducer/AuthReducer';
import {UsuarioAction} from '../redux/actions/AuthAction/AuthAction';

//TODO
/*
    Agreggar un numero ganador y mostrar los que ganaron con cuanto y cuanto en determinado horario
*/

const mapStateToProps = (state) => {
  return {
    ...state,
    USER: AuthenticationReducer(state, UsuarioAction),
  };
};

const Ganador = (props) => {
  const {rol} = props.USER.AuthenticationReducer.User;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ganador, setGanadores] = useState([]);
  const [number, setNumber] = useState('');
  const [visible, setVisible] = useState(false);
  const [fecha, setFecha] = useState('');
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const setGanadores_ = () => {
    let Ganadores = [];
    mostrarGanadores(fecha)
      .then((data) => {
        data.map((item) => {
          Ganadores.push(item);
        });
        setGanadores(Ganadores);
      })
      .catch(() => {});
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    hideDatePicker();
  };

  useEffect(() => {
    setGanadores_();
  }, [number]);

  return (
    <Provider>
      <View>
        <MenuContainer title={'Ganadores'} {...props} />
        {rol === 'Administrador' ? (
          <View style={styles.addNumber}>
            <Text style={styles.text}>Agregar Nuevo Ganador</Text>
            <TextInput
              label="Nombre"
              value={number}
              onChangeText={(data) => setNumber(data)}
              style={{width: 100}}
            />
            <Button
              title="Agregar"
              style={styles.buttonAdd}
              onPress={() => {
                showDialog();
              }}
            />
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Aviso</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>¿Desea Agregar este numero ganador?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <ButtonPaper
                    onPress={() => {
                      const d = new Date();
                      let fecha =
                        d.getDate() +
                        '-' +
                        (d.getMonth() + 1) +
                        '-' +
                        d.getFullYear();
                      RegistrarGanador(fecha, number)
                        .then(() => {
                          setNumber('');
                          hideDialog();
                        })
                        .catch((err) => {
                          console.warn(err);
                        });
                    }}>
                    Si
                  </ButtonPaper>
                  <ButtonPaper
                    onPress={() => {
                      hideDialog();
                    }}>
                    No
                  </ButtonPaper>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        ) : null}

        <View style={styles.container}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(d) => {
              handleConfirm();
              setFecha(
                d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear(),
              );
            }}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-around'}}>
        <ButtonPaper
          color="#97cbdc"
          style={styles.buttonDate}
          onPress={showDatePicker}>
          Ver Fecha
        </ButtonPaper>
        <ButtonPaper
          color="#97cbdc"
          style={styles.buttonDate}
          onPress={() => setGanadores_()}>
          Buscar Ganadores
        </ButtonPaper>
        </View>
        <ScrollView>
          {ganador.map((item, i) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-around',
                }}
                key={item.ID}>
                <Text>Nombre: {item.nombre}</Text>
                <Text>Numero: {item.numero}</Text>
                <Text>Monto: {item.monto}</Text>
                <Text>Premio: {item.premio}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  addNumber: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: widthScreen,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  materialRightIconTextbox2: {
    height: 43,
    width: widthScreen * 0.4,
  },
  text: {
    width: 100,
  },
  buttonAdd: {
    width: 100,
  },
  buttonDate: {
    alignSelf: 'center',
    width: 300,
  },
});

export default connect(mapStateToProps, null)(Ganador);
