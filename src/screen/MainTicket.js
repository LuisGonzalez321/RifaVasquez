/* eslint-disable prettier/prettier */
import React, {useEffect, useReducer, useState} from 'react';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import {ScrollView, Text, View, Alert} from 'react-native';

//redux
import {connect} from 'react-redux';

import {UsuarioAction} from '../redux/actions/AuthAction/AuthAction';
import AuthenticationReducer from '../redux/reducer/AuthReducer/AuthReducer';
import {
  ADD_TICKET,
  CLEAN_TICKET,
} from '../redux/actions/Ticket/NewTicketAction';

//const
import {ListaPremio} from '../const/ConstPremios';

//components
import MenuContainer from '../components/elements/MenuContainer';
import MaterialButtonHamburger from '../components/modules/MainTicket/MaterialButtonHamburger';

//styles
import {styles} from '../style/styleTicket';

//database
import {ValidarNumero} from '../database/models/modelAjusteNumero';

const ButtonsCalculator = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const globalState = {
  valueMount: ' ',
  numberPlay: '00',
  premio: 0,
  typeButtons: 'NÚMERO',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'clearAll':
      return {
        typeButtons: 'NÚMERO',
        valueMount: ' ',
        numberPlay: '00',
        premio: 0,
      };
    case 'changeTypeNumber':
      return {
        ...state,
        typeButtons: 'NÚMERO',
      };
    case 'changeTypeColor':
      return {
        ...state,
        typeButtons: 'MONTO',
      };
    case 'changeMount':
      return {
        ...state,
        valueMount: state.valueMount + action.payload,
      };
    case 'changeNumber':
      return {
        ...state,
        numberPlay: action.payload,
      };
    case 'eraserMount':
      return {
        ...state,
        valueMount: action.payload,
      };
    case 'changePremio':
      return {
        ...state,
        premio: ListaPremio(action.payload),
      };
    default:
      return globalState;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ADD_TICKET_: (Ticket_) => {
      dispatch(ADD_TICKET(Ticket_));
    },
    CLEAR_ALL: () => {
      dispatch(CLEAN_TICKET());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    ...state,
    User: AuthenticationReducer(state, UsuarioAction),
  };
};

const MainTicket = (props) => {
  const {nombrePuesto} = props.User.AuthenticationReducer.User;

  const [state, dispatch] = useReducer(reducer, globalState);
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {}, [state.typeButtons]);

  let changeNumber = (number) => {
    let NumberTemp = state.numberPlay.toString();
    let itemTemp = NumberTemp.toString().charAt(1);
    dispatch({type: 'changeNumber', payload: itemTemp + number});
  };

  let handleValidateNumber = (Ticket_) => {
    let estatus_ = false;
    ValidarNumero(state.numberPlay, nombrePuesto)
      .then((dataStatus) => {
        if (dataStatus) {
          Alert.alert('Numero Restringido')
        } else {
          setCounter(counter + 1);
          props.ADD_TICKET_(Ticket_);
          dispatch({type: 'clearAll'});
        }
      })
      .catch(() => {
        estatus_ = false;
      });

    return estatus_;
  };

  let changeMount = (number) => {
    dispatch({type: 'changeMount', payload: number});
    dispatch({
      type: 'changePremio',
      payload: parseInt(state.valueMount + number),
    });
  };

  let eraserNumber = () => {
    let NumberTemp = state.numberPlay.toString();
    let itemTemp = NumberTemp.toString().charAt(0);
    dispatch({type: 'changeNumber', payload: '0' + itemTemp});
  };

  let eraserMount = () => {
    let new_data =
      state.valueMount.toString() === ' '
        ? ' '
        : state.valueMount
            .toString()
            .slice(0, state.valueMount.toString().length - 1);
    dispatch({type: 'eraserMount', payload: new_data});
    dispatch({type: 'changePremio', payload: new_data});
  };

  const handleSaveTicket = (e) => {
    e.preventDefault();
    const Ticket_ = {
      id: counter,
      numero: state.numberPlay,
      monto: state.valueMount,
      premio: state.premio,
      estado: 'Jugado',
    };

    if (parseInt(state.premio.toString()) === 0) {
      Alert.alert('Ingrese un monto válido!');
    } else {
      handleValidateNumber(Ticket_);
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <MenuContainer
          {...props}
          title={`Nueva Ticket / ${state.typeButtons}`}
        />

        <View style={styles.containerElements}>
          <View style={styles.rect}>
            <Text style={styles.loremIpsum}>Numeros no disponibles:</Text>
          </View>
          <View style={styles.rect2}>
            <Text style={styles.monto}>Monto:</Text>
            <Text style={styles.c0002}>C$ {state.valueMount}</Text>
            <Text style={styles.numero}>Número</Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.premio2}>Premio:</Text>
            <Text style={styles.c0003}>{state.premio}</Text>
            <Text style={styles.text}>{state.numberPlay}</Text>
          </View>
          <View style={styles.containerItems}>
            {ButtonsCalculator.map((button, i) => {
              return (
                <View key={i} style={styles.containerButtons1}>
                  {button.map((item, j) => {
                    return (
                      <MaterialButtonHamburger
                        onPress={() => {
                          if (state.typeButtons === 'MONTO') {
                            changeMount(item.toString());
                          } else {
                            changeNumber(item.toString());
                          }
                        }}
                        style={styles.materialButtonHamburger}
                        number={`numeric-${item}`}
                        key={j}
                      />
                    );
                  })}
                </View>
              );
            })}
            <View style={styles.containerButtons1}>
              <MaterialButtonHamburger
                number="numeric-0"
                onPress={() => {
                  state.typeButtons === 'MONTO'
                    ? changeMount('0')
                    : changeNumber('0');
                }}
                style={styles.materialButtonHamburger}
              />
              <MaterialButtonHamburger
                number="format-list-numbered"
                onPress={() => {
                  dispatch({type: 'changeTypeNumber'});
                }}
                style={
                  state.typeButtons === 'NÚMERO'
                    ? styles.materialButtonHamburger1
                    : styles.materialButtonHamburger
                }
              />
              <MaterialButtonHamburger
                number="currency-usd"
                onPress={() => {
                  dispatch({type: 'changeTypeColor'});
                }}
                style={
                  state.typeButtons === 'MONTO'
                    ? styles.materialButtonHamburger1
                    : styles.materialButtonHamburger
                }
              />
            </View>
            <View style={styles.containerButtons2}>
              <MaterialButtonHamburger
                number="keyboard-backspace"
                onPress={() =>
                  state.typeButtons === 'NÚMERO'
                    ? eraserNumber()
                    : eraserMount()
                }
                style={styles.materialButtonHamburger}
              />
              <MaterialButtonHamburger
                number="cup"
                onPress={() => {
                  dispatch({type: 'clearAll'});
                }}
                style={styles.materialButtonHamburger}
              />
              <MaterialButtonHamburger
                number="content-save-outline"
                onPress={(e) => handleSaveTicket(e)}
                style={styles.materialButtonHamburger}
              />
              <MaterialButtonHamburger
                number="cancel"
                style={styles.materialButtonHamburger}
                onPress={() => showDialog()}
              />
              {/*----------------------------------------------------------------------*/}
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>Alerta</Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>¿Desea cancelar esta venta?</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      onPress={() => {
                        props.CLEAR_ALL();
                        hideDialog();
                        props.navigation.navigate('MainPrincipal');
                      }}>
                      Si
                    </Button>
                    <Button onPress={hideDialog}>No</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
              {/*----------------------------------------------------------------------*/}
            </View>
          </View>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTicket);
