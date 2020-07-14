import {GET_USERS} from '../actions/types';

const initialState = {
  users: []
};

export default (state = initialState, actions:any) => {
  if (actions.type === GET_USERS) {
    return {...state, users:actions.payload};
  } else {
    return state
  }
}
