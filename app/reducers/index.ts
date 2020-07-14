import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import auth from './auth';
// @ts-ignore
import {reducer as formReducer } from 'redux-form';
import users from './users';
import isToggled from './toggle';
import pageName from "./pageName";
import products from './products';
import paginationNum from './pagination';
import invoice from "./invoice";
import reports from "./reports";

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: formReducer,
    auth,
    users,
    isToggled,
    pageName,
    products,
    paginationNum,
    invoice,
    reports
  });
}
