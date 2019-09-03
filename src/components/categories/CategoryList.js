import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  selectCategory = category => {
    this.props.actions.changeCategory(category);
  };

  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Categories</Badge>
        </h3>
        <ListGroup>
          {this.props.categories.map(category => (
            <ListGroupItem
              onClick={() => this.selectCategory(category)}
              active={category.id === this.props.currentCategory.id}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      )
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList);