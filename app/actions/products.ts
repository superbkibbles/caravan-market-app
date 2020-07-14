import data from '../apis/index';
import {Dispatch} from "../reducers/types";
import { sign, decode } from 'jsonwebtoken';

import {
  EDIT_PRODUCT,
  GET_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCTS,
  GET_PAGINATION,
  DELETE_PRODUCT
} from './types'

export const getAllPharmaciesItems = (id: string) => async(dispatch: Dispatch) => {
  try {
    const res = await data.get(`/pharmacy/selectAllPharmaciesItems.php?id=${id}`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data
    })
  } catch(e) {
    console.error(e);
  }
};

export const getProducts = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await data.get(`/pharmacy/selectItems.php?id=${id}`);
    localStorage.removeItem("products");
    const encode = await sign(res, "sdivbsiubdsiub");

    localStorage.setItem("products", encode);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch(e) {
    console.log(e)
  }
};

export const getProduct = (id: string) => async (dispatch: Dispatch) => {
  const res = await data.get(`/pharmacy/selectItemPerId.php?product_id=${id}`);
  dispatch({
    type: GET_PRODUCT,
    payload: res.data
  })
};

export const createProductDetails = (productsDetail: any, products: any, callback: () => void) => async () => {
  try {
    await data.post("/pharmacy/purchaseItems.php", {
          purchase_details: productsDetail,
          purchase: products
        });
    // if(localStorage.getItem("buyingProducts")) {
    //   const bought = decode(localStorage.getItem("buyingProducts"));
    //   bought.data.forEach((product: any) => {
    //     data.post("/pharmacy/purchaseItems.php", {
    //       purchase_details: product.purchase_details,
    //       purchase: product.purchase
    //     });
    //   });
    //   localStorage.removeItem("buyingProducts");
    // }
    callback();
  } catch (e) {
    const newBought = {purchase_details: productsDetail, purchase: products};
    if(localStorage.getItem("buyingProducts")) {
      const bought = decode(localStorage.getItem("buyingProducts"));
      bought.data.push(newBought);
      const encoded = sign(bought, "sdivbsiubdsiub");
      localStorage.setItem("buyingProducts", encoded);
      callback();
    } else {
      const arr: any = {data: []};
      arr.data.push(newBought);
      const encoded = sign(arr, "sdivbsiubdsiub");
      localStorage.setItem("buyingProducts", encoded);
      callback();
    }
  }
};

// export const sellOfflineProducts = () => async () => {
//   try {
//
//   } catch (e) {
//
//   }
// };

export const buyOfflineProducts = () => async () => {
    try {
    const bought = decode(localStorage.getItem("buyingProducts"));
    console.log(JSON.stringify({all_purchase: bought}, null, 1));
    await data.post("/pharmacy/offline/purchaseItems.php", {
      all_purchase: bought.data
    });
    localStorage.removeItem("buyingProducts");
    } catch (e) {
      console.log(e)
    }
};

export const sellProducts = (saleDetail: any, sale: any) => async () => {
  try {
    await data.post("/pharmacy/saleItems.php", {
      sale_details:saleDetail,
      sale: sale
    });
    if(localStorage.getItem("sellingProducts")) {
      const sell = decode(localStorage.getItem("sellingProducts"));
      sell.data.forEach((product: any) => {
        data.post("/pharmacy/saleItems.php", {
          sale_details: product.saleDetail,
          sale: product.sale
        });
      });
      localStorage.removeItem("sellingProducts");
    }
  }
  catch(e) {
    const newSell = {saleDetail: saleDetail, sale: sale};
    if(localStorage.getItem("sellingProducts")) {
      const sell = decode(localStorage.getItem("sellingProducts"));
      sell.data.push(newSell);
      const encoded = sign(sell, "sdivbsiubdsiub");
      localStorage.setItem("sellingProducts", encoded);
    } else {
      const arr: any = {data: []};
      arr.data.push(newSell);
      const encoded = sign(arr, "sdivbsiubdsiub");
      localStorage.setItem("sellingProducts", encoded);
    }
  }
};

export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  await data.post("/pharmacy/deactiveItem.php", {
    product_id: id
  });
  dispatch({
    type: DELETE_PRODUCT,
    payload: id
  })
};

export const editProduct = (id: string, formValues: any) => async (dispatch: Dispatch)  => {
  const res = await data.put(`/`);
  dispatch({
    type: EDIT_PRODUCT,
    payload: res.data
  })
};

export const getPaginationNum = (num: Number) => {
  return {
    type: GET_PAGINATION,
    payload: num
  }
};
