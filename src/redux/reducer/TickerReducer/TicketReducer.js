import {ADD_TICKET} from '../../actions/Ticket/NewTicketAction';

const initialState = {
  TICKET: [],
};

export const TicketReducer_ = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_TODO':
      return {
        ...state,
        TICKET: state.TICKET,
      };
    case 'ADD_NEW_TICKET':
      return {
        ...state,
        Ticket: state.TICKET.push(action.payload),
      };
    case 'CLEAN_TICKET':
      return {
        TICKET: [],
      };
    case 'REMOVE_TICKET':
      return {
        ...state,
        TICKET: state.TICKET.filter((e) => e.id !== action.ID),
      };
    default:
      return state;
  }
};
