import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//componentes
import Login from '../screen/Login';
import LoginUser from '../screen/LoginAuth/LoginUser';
import AuthUser from '../screen/LoginAuth/AuthUser';
import NavigateMain from './NavigateMain';

//database
import {auth} from '../database/firebase';
import {DataUserLogin} from '../database/models/modelAuth';

//redux
import {connect} from 'react-redux';
import {ADD_USER} from '../redux/actions/AuthAction/AuthAction';

const mapDistpacthToProps = (dispatch) => {
  return {
    ADD_USER_: (User) => {
      dispatch(ADD_USER(User));
    },
  };
};

const Stack = createStackNavigator();

const StackAuthUser = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //DataUserLogin(User)
    if (user) {
      DataUserLogin(user.email).then((data) => {
        props.ADD_USER_(data);
      });
    }
    return subscriber; // unsubscribe on unmount
  });

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="MainPrincipal"
          component={NavigateMain}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      )}
      <Stack.Screen
        name="LoginUser"
        component={LoginUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthUser"
        component={AuthUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default connect(null, mapDistpacthToProps)(StackAuthUser);
