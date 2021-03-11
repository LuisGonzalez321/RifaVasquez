import firestore from '@react-native-firebase/firestore';

const Ticket = firestore().collection('Ticket');
const Ganador = firestore().collection('Ganador');
import {HorarioLoto} from '../../const/ConstPremios';

export const RegistrarGanador = async (fecha, numero) => {
  await Ticket.where('fecha', '==', fecha)
    .get()
    .then((item) => {
      item.forEach((element) => {
        const ID = element.id;
        const {ticket, nombrePuesto, nombre, horarioLoto} = element.data();
        ticket.TICKET.map((number) => {
          if (
            number.numero === numero &&
            horarioLoto === HorarioLoto(new Date().getHours())
          ) {
            Ganador.add({
              nombre: nombre,
              monto: number.monto,
              premio: number.premio,
              numero: number.numero,
              fecha: fecha,
              nombrePuesto: nombrePuesto,
              horarioLoto: horarioLoto,
            });
          } else {
          }
        });
      });
    })
    .catch((err) => {});
};

export const mostrarGanadores = async (fecha) => {
  let Ganadores = [];
  await Ganador.where('fecha', '==', fecha)
    .get()
    .then((item) => {
      item.forEach((element) => {
        const ID = element.id;
        const {nombre, numero, premio, monto} = element.data();
        Ganadores.push({ID, nombre, numero, premio, monto});
      });
    })
    .catch((err) => {});
  return Ganadores;
};
