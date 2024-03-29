import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { saveProduct } from '../../redux/actions/productActions';

const AddOrUpdateProduct = ({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) => {
  const [product, setProduct] = useState({ ...props.product });
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });

    return () => {
      cleanup;
    };
  }, [props.product]);

  const handleChange = event => {
    const { name, value } = event.target;
    setProduct(previousProduct => ({
      ...previousProduct,
      [name]: name === 'categoryId' ? parseInt(value, 10) : value
    }));
  };

  const handleSave = event => {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push('/');
    });
  };

  return <div></div>;
};

const getProductById = (products, productId) => {
  let product = products.find(product => product.id === productId);
};

const mapStateToProps = (state, ownProps) => {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productReducer.length > 0
      ? getProductById(state.productReducer, productId)
      : {};
  return {
    product,
    products: state.productReducer,
    categories: state.categoryReducer
  };
};

const mapDispatchToProps = () => {
  getCategories, saveProduct;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrUpdateProduct);
