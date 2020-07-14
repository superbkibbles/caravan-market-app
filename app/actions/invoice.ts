import data from '../apis/index';

import { Dispatch } from '../reducers/types';
import {GET_BUY_INVOICE, GET_SELL_INVOICE} from './types'


export const getBuyInvoice = (id: string) => async (dispatch: Dispatch) => {
  const res = await data.post("/pharmacy/selectPurchaseInvoice.php", {
    id: id
  });
  dispatch({
    type: GET_BUY_INVOICE,
    payload: res.data
  })
};

export const getSellInvoice = (id: string, user_id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await data.post("/pharmacy/selectSaleInvoice.php", {
      id: id,
      user_id: user_id
    });
    dispatch({
      type: GET_SELL_INVOICE,
      payload: res.data
    })
  }
  catch (e) {
    console.log(e)
  }
};
