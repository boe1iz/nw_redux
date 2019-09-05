import * as actionTypes from './actionTypes';

const getProductSuccess = product => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: product
  };
};

const createProductSuccess = product => {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product
  };
};

const updateProductSuccess = product => {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product
  };
};

export const saveProduct = product => {
  return dispatch => {
    return saveProductApi(product)
      .then(savedProduct => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const saveProductApi = product => {
  return fetch('http://lcoalhost:3000/products/' + (product.id || ''), {
    method: product.id ? 'PUT' : 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(product)
  })
    .then(handleResponse)
    .catch(handleError);
};

const handleResponse = async response => {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text;
  throw new Error(error);
};

const handleError = error => {
  console.error('Hata var');
  throw error;
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
