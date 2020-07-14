import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
// @ts-ignore
import { decode } from 'jsonwebtoken';
import _ from 'lodash';

import { configureStore, history } from './store/configureStore';

import Root from './containers/Root';

import './app.global.css';


let decodedStorage;
let decodedSession;
let storageProducts;

if (localStorage.getItem("products")) {
  storageProducts = decode(localStorage.getItem("products")).data;
}

if(localStorage.getItem("login-store")){
  decodedStorage = decode(localStorage.getItem('login-store')).data;
}
if(sessionStorage.getItem("login-user")) {
  decodedSession = decode(sessionStorage.getItem(`login-user`)).data;
}

const store = configureStore({
  reports: undefined,
  paginationNum: 1,
  products: {..._.mapKeys(storageProducts, "item_id")},
  isToggled: {toggled: true},
  pageName: {currentPage: ""},
  users: [],
  auth: { authenticateStore: decodedStorage ,
    authenticateUser: decodedSession, errorMessage: ''
  },
  invoice: {}
});

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
