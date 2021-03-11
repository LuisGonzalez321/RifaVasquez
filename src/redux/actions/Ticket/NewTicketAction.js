export const ADD_TICKET = (TICKET) => {
  return {
    type: 'ADD_NEW_TICKET',
    payload: TICKET,
  };
};

export const SHOW_TODO = () => {
  return {
    type: 'SHOW_TODO',
  };
};

export const CLEAN_TICKET = () => {
  return {
    type: 'CLEAN_TICKET',
  };
};

export const REMOVE_TICKET = (ID) => {
  return {
    type: 'REMOVE_TICKET',
    ID,
  };
};
