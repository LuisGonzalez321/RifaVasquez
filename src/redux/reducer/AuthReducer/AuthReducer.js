const initialState = {
  User: {},
};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'READ_USER':
      return {
        ...state,
        User: state.User,
      };
    case 'ADD_USER':
      return {
        ...state,
        User: action.payload,
      };
    case 'CLEAN':
      return {
        state:{},
      };
    default:
      return state;
  }
};

export default AuthenticationReducer;
