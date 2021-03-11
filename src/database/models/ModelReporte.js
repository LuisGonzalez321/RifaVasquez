import {firestore} from '../firebase';

import {HorarioLoto} from '../../const/ConstPremios';

const Venta = firestore().collection('Ticket');
const Ganador = firestore().collection('Ganador');

export let VentasPorPuestoFecha = async (puesto, fecha) => {
  let VentaTicket = [];
  await Venta.where('fecha','==',fecha)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        const ID = item.id;
        const {ticket, nombrePuesto, nombre, horarioLoto, hora} = item.data();
        if (puesto === nombrePuesto) {
          VentaTicket.push({
            ID: ID,
            ticket: ticket.TICKET,
            nombrePuesto: nombrePuesto,
            nombre: nombre,
            horarioLoto: horarioLoto,
            hora: hora,
          });
        }
      });
     
    })
    .catch((err) => {
      VentaTicket = [];
    });
  return VentaTicket;
};

export let searchVentaByDate = async (Puesto, fecha) => {
  let value = {};
  await Venta.where('fecha', '==', fecha)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        const {fecha} = doc.data();
        value = {
          fecha: fecha,
        };
      });
    })
    .catch(() => {
      return (value = false);
    });

  return value;
};

export let RecaudacionPorFechaPuesto = async (fecha, puesto) => {
  let recaudacion = [];
  let mañana = 0;
  let tarde = 0;
  let noche = 0;
  await Venta.where('fecha', '==', fecha)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        const {nombrePuesto, ticket, horarioLoto} = item.data();

        if (nombrePuesto === puesto) {
          if ('Mañana' === horarioLoto) {
            ticket.TICKET.map((value) => {
              mañana += parseInt(value.monto);
            });
          } else if ('Tarde' === horarioLoto) {
            ticket.TICKET.map((value) => {
              tarde += parseInt(value.monto);
            });
          } else if ('Noche' === horarioLoto) {
            ticket.TICKET.map((value) => {
              noche += parseInt(value.monto);
            });
          }
        }
      });
      recaudacion.push({horario: 'Mañana', monto: mañana});
      recaudacion.push({horario: 'Tarde', monto: tarde});
      recaudacion.push({horario: 'Noche', monto: noche});
    })
    .catch(() => {
      recaudacion = [];
    });
  return recaudacion;
};

export let MontoPagadoPorFechaPuesto = async (fecha, puesto) => {
  let recaudacion = [];
  let mañana = 0;
  let tarde = 0;
  let noche = 0;
  await Ganador.where('fecha', '==', fecha)
    .get()
    .then((snap) => {
      snap.forEach((item) => {
        const {nombrePuesto, premio, horarioLoto} = item.data();
        if (nombrePuesto === puesto) {
          if ('Mañana' === horarioLoto) {
            mañana += parseInt(premio);
          } else if ('Tarde' === horarioLoto) {
            tarde += parseInt(premio);
          } else if ('Noche' === horarioLoto) {
            noche += parseInt(premio);
          }
        }
      });
      recaudacion.push({horario: 'Mañana', monto: mañana});
      recaudacion.push({horario: 'Tarde', monto: tarde});
      recaudacion.push({horario: 'Noche', monto: noche});
    })
    .catch(() => {
      recaudacion = [];
    });
  return recaudacion;
};
