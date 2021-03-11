import firestore from '@react-native-firebase/firestore';

let list = [];

const ALL_AWARDS = async () => {
  await firestore()
    .collection('Administrador')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        list.push({
          ID: documentSnapshot.id,
          correo: documentSnapshot.data().correo,
          contraseña: documentSnapshot.data().contraseña,
          habilitado: documentSnapshot.data().habilitado,
          token: documentSnapshot.data().token,
        });
      });
    })
    .catch((err) => (list = null));

  return list;
};

export default ALL_AWARDS;
