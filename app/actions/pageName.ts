import {CURRENT_PAGE} from "./types";

export const getPageName = (page: string) => {
  return {
    type: CURRENT_PAGE,
    payload: page
  }
};
