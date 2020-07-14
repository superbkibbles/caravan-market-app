import {CLOSE_SLIDE_BAR, OPEN_SLIDE_BAR} from './types';

export const closeSlider = () => {
  return {
    type: CLOSE_SLIDE_BAR,
    payload: false
  }
};

export const openSlider = () => {
  return {
    type: OPEN_SLIDE_BAR,
    payload: true
  }
};
