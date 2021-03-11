import firestore from '@react-native-firebase/firestore';
import {auth} from '../firebase';

const Usuario = firestore().collection('Usuario');

let userData = {};
let userData1 = {};

export let searchTokenAndvalidate = async (token) => {
  let value = false;
  let id = 0;
  const citiesRef = Usuario.where('isUsed', '==', false);
  await citiesRef
    .where('token', '==', token)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        value = doc.data().token === token ? true : false;
        value ? (id = doc.id) : (id = 0);
      });
    })
    .catch(() => {
      return (value = false);
    });

  if (value === true) {
    await Usuario.doc(id).update({
      isUsed: true,
    });
  }
  return value;
};

export const userAuth = async (email, pass) => {
  let status = false;
  await auth()
    .signInWithEmailAndPassword(email, pass)
    .then((res) => {
      status = true;
    })
    .catch((err) => {
      console.warn(err);
      status = false;
    });
  return status;
};

export const DataUser = async (email_, contraseña_) => {
  await Usuario.get()
    .then((data) => {
      data.forEach((item) => {
        const {
          email,
          contraseña,
          nombre,
          nombrePuesto,
          token,
          isUsed,
          rol,
        } = item.data();
        if (email_ === email && contraseña_ === contraseña && isUsed) {
          userData = {
            nombre: nombre,
            nombrePuesto: nombrePuesto,
            token: token,
            isUsed: isUsed,
            rol: rol,
          };
          return;
        }
      });
    })
    .catch((err) => {
      userData = {};
    });

  return userData;
};

export const DataUserLogin = async (email_) => {
  await Usuario.get()
    .then((data) => {
      data.forEach((item) => {
        const {email, nombre, nombrePuesto, token, isUsed, rol} = item.data();
        if (email_ === email) {
          userData1 = {
            nombre: nombre,
            nombrePuesto: nombrePuesto,
            token: token,
            isUsed: isUsed,
            rol: rol,
          };
          return;
        }
      });
    })
    .catch((err) => {
      userData1 = {};
    });

  return userData1;
};

export const signOut = async () => {
  await auth()
    .signOut()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export let CargarPuestos = async () => {
  let list = [];
  await Usuario.orderBy('nombrePuesto')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        list.push({
          Puesto: documentSnapshot.data().nombrePuesto,
        });
      });
    })
    .catch((err) => {
      list = null;
    });
  return list;
};
