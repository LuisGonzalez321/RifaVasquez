import {firestore} from '../firebase';

const Modelnumero = firestore().collection('NumerosBloqueados');

export let AgregarNumero = async (numeroData) => {
  await Modelnumero.add(numeroData)
    .then(() => {})
    .catch(() => {});
};

export let cargarNumeros_ = async () => {
  let list = [];
  await Modelnumero.orderBy('Puesto')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        list.push({
          id: documentSnapshot.id,
          Puesto: documentSnapshot.data().Puesto,
          estado: documentSnapshot.data().estado,
          fecha: documentSnapshot.data().fecha,
          hora: documentSnapshot.data().hora,
          numero: documentSnapshot.data().numero
        });
      });
    })
    .catch((err) => {
      list = null;
    });
  return list;
};


export let ValidarNumero = async (number, puesto) => {
  let stateNumber = false;
  await Modelnumero.where('Puesto', '==', puesto)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        const {numero} = item.data();
        if (numero === number) {
          stateNumber = true;
        } else {
          stateNumber = false;
        }
      });
    })
    .catch(() => {
      stateNumber = false;
    });
  return stateNumber;
};

export let EditarNumeroPuesto = async (number, puesto) => {
  await Modelnumero.where('Puesto', '==', puesto)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        let id = item.id;
        const {numero, estado} = item.data();
        if (numero === number) {
          Modelnumero.doc(id).update({
            estado: !estado,
          });
        }
      });
    })
    .catch(() => {});
};

export let EliminarNumeroPuesto = async (number, puesto) => {
  await Modelnumero.where('Puesto', '==', puesto)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        let id = item.id;
        const {numero} = item.data();
        if (numero === number) {
          Modelnumero.doc(id)
            .delete()
            .then(() => {})
            .catch(() => {});
        }
      });
    })
    .catch(() => {});
};
