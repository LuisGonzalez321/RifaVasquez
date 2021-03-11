import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

//Components
import MaterialRightIconTextbox1 from '../components/modules/Login/MaterialRightIconTextbox1';
import MaterialButtonViolet from '../components/modules/Login/MaterialButtonViolet';
import ContentLogin from '../components/modules/Login/ContentLogin';

//REDUX
import {ADD_USER} from '../redux/actions/AuthAction/AuthAction';
import {connect} from 'react-redux';

//database
import {DataUser, userAuth} from '../database/models/modelAuth';

const mapDistpacthToProps = (dispatch) => {
  return {
    ADD_USER: (User) => {
      dispatch(ADD_USER(User));
    },
  };
};

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {}, []);

  const readData = (email, pass) => {
    DataUser(email, pass)
      .then((data) => {
        //agregando al store el nuevo usuario
        props.ADD_USER(data);
        //setiando el estado
        setUserName('');
        setUserPass('');
        setShowMessage(false);
        props.navigation.navigate('MainPrincipal');
      })
      .catch((err) => {});
  };

  return (
    <ScrollView style={styles.container}>
      <ContentLogin title="Rifa Vasquez" />
      <View style={styles.rect}>
        <View style={styles.materialRightIconTextbox2Column}>
          <MaterialRightIconTextbox1
            enabledIcon="account"
            onChangeText={(text) => setUserName(text)}
            value={userName}
            inputStyle="Usuario"
            secureTextEntry={false}
            style={styles.materialRightIconTextbox2}
          />
          <MaterialRightIconTextbox1
            onChangeText={(text) => setUserPass(text)}
            value={userPass}
            enabledIcon="lock"
            secureTextEntry={true}
            inputStyle="Contraseña"
            style={styles.materialRightIconTextbox1}
          />
        </View>
        <View style={styles.materialRightIconTextbox2ColumnFiller}>
          {showMessage ? (
            <Text style={styles.textError}>Error con inicio de sesión</Text>
          ) : null}
        </View>
        <MaterialButtonViolet
          title="INGRESAR"
          style={styles.materialButtonViolet}
          {...props}
          onPress={() => {
            //Validando inicion de sesion
            if (
              userName.toString().length > 3 &&
              userPass.toString().length >= 4
            ) {
              userAuth(userName, userPass)
                .then((status) => {
                  if (status) {
                    //entrando a la promesa
                    readData(userName, userPass);
                  } else {
                    setShowMessage(true);
                  }
                })
                .catch(() => {
                  setShowMessage(true);
                });
            } else {
              setShowMessage(true);
            }
          }}
        />
        <Button
          mode="text"
          onPress={() => props.navigation.navigate('LoginUser')}>
          No tienes cuenta? Crear una
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rect2: {
    height: 303,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'space-between',
    marginTop: 67,
  },
  loginAdministrador: {
    fontFamily: 'roboto-700',
    color: 'rgba(151,203,220,1)',
    textAlign: 'center',
    fontSize: 20,
    height: 26,
    alignSelf: 'center',
  },
  rect3: {
    height: 245,
    backgroundColor: 'rgba(255,255,255,1)',
    alignSelf: 'stretch',
  },
  ellipse: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
  },
  image: {
    width: 205,
    height: 39,
    position: 'absolute',
    top: 80,
    left: 0,
  },
  ellipseStack: {
    alignSelf: 'center',
    width: 205,
    height: 200,
    marginTop: 39,
  },
  rect2Filler: {
    flex: 1,
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
    marginTop: 96,
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

export default connect(null, mapDistpacthToProps)(Login);
