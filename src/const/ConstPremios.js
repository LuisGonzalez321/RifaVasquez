export const ListaPremio = (value) => {
  let data = parseInt(value.toString());
  switch (data) {
    case 130:
      return 10000;
    case 104:
      return 8000;
    case 52:
      return 4000;
    case 39:
      return 3000;
    case 26:
      return 2000;
    case 20:
      return 1600;
    case 15:
      return 1200;
    case 13:
      return 1000;
    case 10:
      return 800;
    case 5:
      return 400;
    case 2:
      return 100;
    case 1:
      return 50;
    default:
      return 0;
  }
};


export let HorarioLoto = (hora) => {
  const dataHour = parseInt(hora.toString());
  if (dataHour <= 11) {
    return 'Mañana';
  } else if (dataHour > 11 && dataHour <= 15) {
    return 'Tarde';
  } else if (dataHour > 15 && dataHour <= 24) {
    return 'Noche';
  }
};