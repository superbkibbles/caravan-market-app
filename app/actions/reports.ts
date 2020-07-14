import data from '../apis/index'
import {Dispatch} from '../reducers/types';
import { GET_PURCHASED_REPORTS, GET_SOLD_REPORTS, GET_ONE_BUY_INVOICE, GET_ONE_SELL_INVOICE } from './types';

export const getBuyingReports = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await data.get(`/pharmacy/selectAllPurchaseInvoice.php?id=${id}`);
    dispatch({
      type: GET_PURCHASED_REPORTS,
      payload: res.data
    })
  } catch (e) {
    console.log(e)
  }
};

export const getSellingReports = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await data.get(`/pharmacy/selectAllSaleInvoice.php?id=${id}`);
    dispatch({
      type: GET_SOLD_REPORTS,
      payload: res.data
    })
  } catch (e) {
    console.log(e)
  }
};

export const getBuyingReport = (id: number, invoice: number) => async (dispatch: Dispatch) => {
  try {
    const res = await data.get(`/pharmacy/selectOnePurchaseInvoice.php/?id=${id}&invoice=${invoice}`);
    dispatch({
      type: GET_ONE_BUY_INVOICE,
      payload: res.data
    })
  } catch (e) {
    console.log(e)
  }
};

export const getSellingReport = (id: number, invoice: number) => async (dispatch: Dispatch) => {
  try {
    const res = await data.get(`/pharmacy/selectOneSaleInvoice.php/?id=${id}&invoice=${invoice}`);
    dispatch({
      type: GET_ONE_SELL_INVOICE,
      payload: res.data
    })
  } catch (e) {
    console.log(e)
  }
};



