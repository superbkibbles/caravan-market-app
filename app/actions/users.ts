import { Dispatch } from '../reducers/types';
import data from '../apis';
import { GET_USERS } from './types';
import { decode } from 'jsonwebtoken';

export const getUsers = (id: string) => async (dispatch: Dispatch) => {
  try {
    const res = await data.get(`/admin/selectPharmacyUsers.php?id=${id}`);
    const decoded = decode(res.data.jwt);
    dispatch({
      type: GET_USERS,
      payload: decoded.data[0]
    })
  } catch (e) {
    if (localStorage.getItem("secondLogin")) {
      const arr = [];
      const values = decode(localStorage.getItem("secondLogin"));
      arr.push(values.data);
      dispatch({
        type: GET_USERS,
        payload: arr
      })
    }
  }
};
