export const UsuarioAction = () => {
  return {
    type: 'READ_USER',
  };
};

export const CLEAN_USER = () => {
  return {
    type: 'CLEAN'
  }
}

export const ADD_USER = (User) => {
  return {
    type: 'ADD_USER',
    payload: User,
  };
};
