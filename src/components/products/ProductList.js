import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Badge, Table, Button } from 'reactstrap';
import * as productActions from '../../redux/actions/productActions';
import * as cartActions from '../../redux/actions/cartActions';
import alertify from 'alertifyjs';

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart = product => {
    this.props.actions.addToCart({
      quantity: 1,
      product
    });
    alertify.success(product.productName + ' added to cart.');
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Products</Badge>
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity per Unit</th>
              <th>Units in Stock</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button
                    color="success"
                    onClick={() => this.addToCart(product)}
                  >
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
