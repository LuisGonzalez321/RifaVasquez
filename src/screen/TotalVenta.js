import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  TextInput,
  Dialog,
  Portal,
  Button,
  Provider,
  IconButton,
} from 'react-native-paper';

//components
import MenuContainer from '../components/elements/MenuContainer';
//redux
import {connect} from 'react-redux';
import {TicketReducer_} from '../redux/reducer/TickerReducer/TicketReducer';
import {
  CLEAN_TICKET,
  REMOVE_TICKET,
  SHOW_TODO,
} from '../redux/actions/Ticket/NewTicketAction';

import {UsuarioAction} from '../redux/actions/AuthAction/AuthAction';
import AuthenticationReducer from '../redux/reducer/AuthReducer/AuthReducer';

//database
import ADD_NEW_TICKET from '../database/models/modelTicket';
import {ValidarHoraCierre} from '../database/models/modelHoraCierre';

//const
import {HorarioLoto} from '../const/ConstPremios';

//Printer
import BLEPrint_ from '../components/modules/Printer/BLEPrint_';

const widthScreen = Dimensions.get('window').width;

const mapStateToProps = (state) => {
  return {
    ...state,
    item: TicketReducer_(state, SHOW_TODO),
    User: AuthenticationReducer(state, UsuarioAction),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    RemoveItem: (ID) => {
      dispatch(REMOVE_TICKET(ID));
    },
    CLEAR_ALL: () => {
      dispatch(CLEAN_TICKET());
    },
  };
};

const TotalVenta = (props) => {
  const {nombrePuesto} = props.User.AuthenticationReducer.User;

  const Elements = props.item.TicketReducer_;
  let f = new Date();
  const [nombreCliente, useNombre] = useState('');

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [mostrarBotonAgregar, setmostrarBotonAgregar] = useState(false);

  const [Tempo, setTempo] = useState({
    Hora: 0,
    Minuto: 0,
    Segundo: 0,
  });
  let currentHora = new Date();

  useEffect(() => {
    ValidarHoraCierreTV();
    setTimeout(() => {
      setTempo({
        ...Tempo,
        Hora: currentHora.getHours(),
        Minuto: currentHora.getMinutes(),
        Segundo: currentHora.getSeconds(),
      });
    }, 1000);
  }, [Tempo.Segundo]);

  let ValidarHoraCierreTV = () => {
    ValidarHoraCierre(HorarioLoto(Tempo.Hora))
      .then((hour_) => {
        const {Hora, Minuto} = hour_;
        if (Tempo.Hora === parseInt(Hora)) {
          if (Tempo.Minuto >= parseInt(Minuto)) {
            setmostrarBotonAgregar(true);
          } else {
            setmostrarBotonAgregar(false);
          }
        } else {
          setmostrarBotonAgregar(false);
        }
      })
      .catch(() => {
        return setmostrarBotonAgregar(false);
      });
  };

  let AddNewTicketDB = () => {
    const item = {
      nombrePuesto: nombrePuesto,
      nombre: nombreCliente,
      hora: Tempo.Hora + ':' + Tempo.Minuto + '-' + Tempo.Segundo,
      horarioLoto: HorarioLoto(Tempo.Hora),
      fecha: f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear(),
      ticket: Elements,
    };

    if (nombreCliente.toString().length > 3 && SumTotal() > 0) {
      ADD_NEW_TICKET(item);
      showDialog(setVisible(true));
    } else {
      showDialog(setVisible(true));
    }
  };

  const SumTotal = () => {
    let sum = 0;
    Elements.TICKET.map((item) => {
      sum += parseInt(item.monto.toString());
    });
    return sum;
  };

  let TODO_TICKET = () => {
    let cadena = '';
    Elements.TICKET.map((item, i) => {
      cadena +=
        '<C>Numero:' +
        item.numero +
        ' Monto:' +
        item.monto +
        ' Premio:' +
        item.premio +
        '</C>\n';
    });
    return cadena;
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <MenuContainer {...props} title="Total Venta" />
        <View style={styles.materialHeader11StackColumn}>
          <View style={styles.materialHeader11Stack}>
            <View style={styles.group2}>
              <Text style={styles.nombreDelCliente3}>Nombre del cliente :</Text>
              <TextInput
                label="Nombre"
                value={nombreCliente}
                onChangeText={(data) => useNombre(data)}
                style={{width: 200}}
              />
            </View>
            <View style={styles.container_mount}>
              <Text style={styles.nombreDelCliente4}>Monto total :</Text>
              <Text style={styles.nombreDelCliente4}>C$ {SumTotal()}</Text>
            </View>
          </View>
          <View style={styles.group}>
            <View style={styles.scrollAreaStack}>
              <View style={styles.scrollArea}>
                <ScrollView
                  horizontal={false}
                  contentContainerStyle={
                    styles.scrollArea_contentContainerStyle
                  }>
                  {Elements.TICKET.map((item, i) => {
                    return (
                      <View key={item.id} style={styles.group4}>
                        <Text style={styles.numero1}>Número:</Text>
                        <Text style={styles.c4}>{item.numero}</Text>
                        <Text style={styles.monto1}>Monto:</Text>
                        <Text style={styles.c5}>{item.monto}</Text>
                        <Text style={styles.premio1}>Premio:</Text>
                        <Text style={styles.c6}>{item.premio}</Text>
                        <IconButton
                          icon="delete"
                          color="#004581"
                          size={20}
                          onPress={() => {
                            props.RemoveItem(item.id);
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
                {/*--------------------------------------------------*/}
                {nombreCliente.toString().length > 3 && SumTotal() > 0 ? (
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Exito!!</Dialog.Title>
                      <Dialog.Content>
                        <Text>Se ha guardado exitosamente!!!</Text>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button
                          onPress={() => {
                            useNombre('');
                            props.CLEAR_ALL();
                            hideDialog();
                            props.navigation.navigate('MainPrincipal');
                          }}>
                          Ok
                        </Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                ) : (
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Error</Dialog.Title>
                      <Dialog.Content>
                        <Text>
                          Verifique un nombre válido o que haya al menos un
                          numero a jugar.
                        </Text>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Ok</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                )}
                {/*--------------------------------------------------*/}
              </View>
            </View>
          </View>
          {mostrarBotonAgregar === true ? (
            <Text>Aplicacion cerrada</Text>
          ) : (
            <BLEPrint_
              onAction={AddNewTicketDB}
              Ticket={
                '<CM>RIFA VASQUEZ</CM>\n\n' +
                '<C>Nombre del cliente :' +
                nombreCliente +
                '</C>\n' +
                TODO_TICKET() +
                '<C>Total de la compra :' +
                SumTotal() +
                'C$</C>\n' +
                '<C>Hora: ' +
                Tempo.Hora +
                ':' +
                Tempo.Minuto +
                '-' +
                Tempo.Segundo +
                ' Fecha ' +
                f.getDate() +
                '-' +
                (f.getMonth() + 1) +
                '-' +
                f.getFullYear() +
                '</C>\n' +
                '<C>Horario: ' +
                HorarioLoto(Tempo.Hora) +
                '</C>\n' +
                '<C>Puesto: ' +
                nombrePuesto +
                '</C>\n' +
                '<C>Ticket cliente</C> \n' +
                '<C>=========================</C>\n' +
                '<CM>RIFA VASQUEZ</CM>\n\n' +
                '<C>Nombre del cliente :' +
                nombreCliente +
                '</C>\n' +
                TODO_TICKET() +
                '<C>Total de la compra :' +
                SumTotal() +
                'C$</C>\n' +
                '<C>Hora: ' +
                Tempo.Hora +
                ':' +
                Tempo.Minuto +
                '-' +
                Tempo.Segundo +
                ' Fecha ' +
                f.getDate() +
                '-' +
                (f.getMonth() + 1) +
                '-' +
                f.getFullYear() +
                '</C>\n' +
                '<C>Horario: ' +
                HorarioLoto(Tempo.Hora) +
                '</C>\n' +
                '<C>Puesto: ' +
                nombrePuesto +
                '</C>\n' +
                '<C>Ticket Puesto</C>'
              }
              onHabilitate = {nombreCliente.toString().length > 3 && SumTotal() > 0?true:false}
            />
          )}
        </View>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  group2: {
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: 'rgba(151,203,220,1)',
    shadowOffset: {
      height: 1,
      width: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    alignItems: 'center',
    left: 0,
    right: 0,
  },
  container_mount: {
    height: 50,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: 'rgba(151,203,220,1)',
    shadowOffset: {
      height: 1,
      width: 3,
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 50,
  },
  nombreDelCliente3: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
    fontSize: 20,
  },
  nombreDelCliente4: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
    fontSize: 20,
  },
  materialHeader11Stack: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 60,
  },
  group: {
    height: 492,
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: 37,
  },
  scrollArea: {
    height: 486,
    backgroundColor: 'rgba(253,253,253,1)',
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
  },
  scrollArea_contentContainerStyle: {
    flex: 1,
  },
  group4: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  numero1: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  c4: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  monto1: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  c5: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  premio1: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  c6: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  group3: {
    top: 0,
    left: 0,
    height: 65,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    right: 0,
  },
  numero: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  c000: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  monto: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  c0002: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  premio: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  c0003: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,27,72,1)',
  },
  scrollAreaStack: {
    height: 492,
  },
  materialHeader11StackColumn: {
    marginTop: 24,
  },
  materialHeader11StackColumnFiller: {
    flex: 1,
  },
  materialBasicFooter1: {
    height: 56,
    backgroundColor: 'rgba(168,75,75,1)',
  },
  materialButtonViolet: {
    height: 36,
    width: 303,
    backgroundColor: 'rgba(1,138,189,1)',
    marginBottom: 30,
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TotalVenta);
