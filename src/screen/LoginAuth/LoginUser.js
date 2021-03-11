import React,{useEffect, useReducer} from 'react';
import {View, ScrollView, StyleSheet, Alert } from 'react-native';
import {Provider, Portal, Dialog, Paragraph, Button} from 'react-native-paper';

//redux
import { connect } from "react-redux";
import { ADD_USER } from "../../redux/actions/AuthAction/AuthAction";

//firebase
import auth from '@react-native-firebase/auth';
import {firestore} from '../../database/firebase';
const db = firestore().collection('Usuario');

//Componets
import ContentLogin from '../../components/modules/Login/ContentLogin';
import MaterialRightIconTextbox1 from '../../components/modules/Login/MaterialRightIconTextbox1';
import MaterialButtonViolet from '../../components/modules/Login/MaterialButtonViolet';


const mapDispatchToProps = (dispatch) => {
    return {
      ADD_USER_: (User) => {
        dispatch(ADD_USER(User));
      }
    }
}

const initialState = {
  nombre: '',
  nombrePuesto: '',
  email: '',
  contraseña: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'nombre':
      return {
        ...state,
        nombre: action.payload,
      };
    case 'nombrePuesto':
      return {
        ...state,
        nombrePuesto: action.payload,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'contraseña':
      return {
        ...state,
        contraseña: action.payload,
      };
    default:
      return state;
  }
};

const LoginUser = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const createAuth = async (email, password) => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Cuenta de usuario creada');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Este correo realmente esta en uso');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Este correo es invalido!');
        }
        Alert.alert(error);
      });
  };

  const addUser = async (User) => {
    await db
      .add(User)
      .then(() => {
        Alert.alert('Usuario registrado');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('La dirección de correo es inválido!');
        }
        Alert.alert(error);
      });
  };

  function random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
  }

  function token() {
    return random() + random(); // Para hacer el token más largo
  }

  

  const handleCreateUserAndSignIn = (e) => {
    if (
      state.nombre.toString().lenght <= 3 ||
      state.nombrePuesto.toString().lenght <= 5 ||
      state.email.toString().lenght <= 5 ||
      state.contraseña.toString().lenght <= 7
    ) {
      showDialog();
    } else {
      const User = {
        nombre: state.nombre,
        nombrePuesto: state.nombrePuesto,
        email: state.email,
        contraseña: state.contraseña,
        token: token(),
        rol: 'usuario',
        isUsed: false,
      };

     
      createAuth(User.email, User.contraseña)
        .then(() => {
          addUser(User)
            .then(() => {
              props.ADD_USER_(User);
              props.navigation.navigate('AuthUser');
            })
            .catch(() => {
              Alert.alert('ERROR');
            });
        })
        .catch(() => {
          Alert.alert('ERROR');
        });
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <ContentLogin title="Crear nueva cuenta" />
        <View style={styles.rect}>
          <View style={styles.materialRightIconTextbox2Column}>
            <MaterialRightIconTextbox1
              enabledIcon="account"
              onChangeText={(text) =>
                dispatch({type: 'nombrePuesto', payload: text})
              }
              value={state.nombrePuesto}
              inputStyle="Nombre del puesto"
              secureTextEntry={false}
              style={styles.materialRightIconTextbox2}
            />
            <MaterialRightIconTextbox1
              onChangeText={(text) => dispatch({type: 'nombre', payload: text})}
              value={state.nombre}
              enabledIcon="card-text-outline"
              secureTextEntry={false}
              inputStyle="Nombre"
              style={styles.materialRightIconTextbox1}
            />
            <MaterialRightIconTextbox1
              onChangeText={(text) => dispatch({type: 'email', payload: text})}
              value={state.email}
              enabledIcon="email-outline"
              secureTextEntry={false}
              inputStyle="Correo"
              style={styles.materialRightIconTextbox1}
            />
            <MaterialRightIconTextbox1
              onChangeText={(text) =>
                dispatch({type: 'contraseña', payload: text})
              }
              value={state.contraseña}
              enabledIcon="lock"
              secureTextEntry={true}
              inputStyle="Contraseña"
              style={styles.materialRightIconTextbox1}
            />
          </View>
          <MaterialButtonViolet
            title="Aceptar"
            style={styles.materialButtonViolet}
            {...props}
            onPress={(e) => handleCreateUserAndSignIn(e)}
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alerta</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Verifique que todos los campo esten bien</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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

export default connect(null,mapDispatchToProps)(LoginUser);
