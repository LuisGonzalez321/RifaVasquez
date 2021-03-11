//import {firestore} from '../firebase';
import firestore from '@react-native-firebase/firestore';

const DataHora = firestore().collection('HoraCierre');

export const EditarHoraCierre = async (hour, minute, Horario) => {
  let id = 0;
  await DataHora.where('Horario', '==', Horario)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        id = item.id;
      });
      DataHora.doc(id).update({
        Hora: hour,
        Minuto: minute,
      });
    })
    .catch((err) => {});
};

export const ValidarHoraCierre = async (Horario) => {
  let horario_ = {};
  await DataHora.where('Horario', '==', Horario)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        id = item.id;
        const {Hora, Minuto} = item.data();
        horario_ = {
          Hora: Hora,
          Minuto: Minuto,
        };
      });
    })
    .catch((err) => {
      horario_ = {};
    });

  return horario_;
};
