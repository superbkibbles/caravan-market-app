import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type stateType = {
  auth: {
    authenticateStore: any;
    authenticateUser: any;
    errorMessage: string;
  };
  users: [];
  isToggled: {
    toggled: boolean;
  };
  pageName: {
    currentPage: string;
  },
  products: any,
  paginationNum: number;
  invoice: any;
  reports: any;
};

export type GetState = () => stateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<stateType, Action<string>>;
