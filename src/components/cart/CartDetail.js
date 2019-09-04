import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import { Table, Button } from 'reactstrap';
import alertify from 'alertifyjs';

class CartDetail extends Component {
  removeFromCart = product => {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + ' removed from cart.');
  };

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map(cartItem => (
              <tr key={cartItem.product.id}>
                <th scope="row">{cartItem.product.id}</th>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.product.unitPrice}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => {
                      this.removeFromCart(cartItem.product);
                    }}
                  >
                    Remove
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
    cart: state.cartReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetail);
