import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const addTicket = firestore().collection('Ticket');

const ADD_NEW_TICKET = async (TICKET) =>
  await addTicket
    .add(TICKET)
    .then(() => {})
    .catch((err) => {});

export default ADD_NEW_TICKET;

