import {OPEN_SLIDE_BAR, CLOSE_SLIDE_BAR} from '../actions/types';

const initialState = {
  toggled: true
};

export default (state =  initialState, actions: any) => {
  switch (actions.type) {
    case OPEN_SLIDE_BAR:
      return {...state, toggled: actions.payload};
    case CLOSE_SLIDE_BAR:
      return {...state, toggled: actions.payload};
    default:
      return state
  }
}
