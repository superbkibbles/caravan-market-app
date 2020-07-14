import {
  AUTH_STORE,
  AUTH_USER,
  AUTH_ERROR,
  LOGOUT_USER,
  LOGOUT_STORE
} from '../actions/types';

const initState = {
  authenticateStore: '',
  authenticateUser: '',
  errorMessage: ''
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case AUTH_STORE:
      return { ...state, authenticateStore: action.payload, errorMessage: '' };
    case AUTH_USER:
      return { ...state, authenticateUser: action.payload, errorMessage: '' };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    case LOGOUT_USER:
      return { ...state, authenticateUser: action.payload};
    case LOGOUT_STORE:
      return { ...state, authenticateStore: action.payload};
    default:
      return state;
  }
};
