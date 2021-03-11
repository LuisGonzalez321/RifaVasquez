import firestore from '@react-native-firebase/firestore';

let list = [];

const ALL_AWARDS = async () => {
  await firestore()
    .collection('Premio')
    .orderBy('Monto')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        list.push({
          ID: documentSnapshot.id,
          monto: documentSnapshot.data().Monto,
          premio: documentSnapshot.data().PremioMonto,
        });
      });
    })
    .catch((err) => {
      list = null;
    });
  return list;
};

export default ALL_AWARDS;
