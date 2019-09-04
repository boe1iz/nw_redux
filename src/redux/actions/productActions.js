import * as actionTypes from './actionTypes';

const getProductSuccess = product => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: product
  };
};

export const getProducts = categoryId => {
  return dispatch => {
    let url = 'http://localhost:3000/products';
    if (categoryId) {
      url = url + '?categoryId=' + categoryId;
    }
    return fetch(url)
      .then(response => response.json())
      .then(products => dispatch(getProductSuccess(products)));
  };
};
