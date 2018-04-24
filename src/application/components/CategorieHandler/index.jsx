import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCategorieAction, removeCategorieAction } from '../../services/Categories/aids/actions';
import Categorie from './Categorie.jsx';

class CategorieContainer extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  takeCategories(categories) {
    let output = [];
    for (let title in categories) {
      if (categories.hasOwnProperty(title) && title !== 'last_id') {
        output.push(<Categorie 
          key={title} 
          title={title} 
          notes={categories[title]}
          addCategorie={this.props.addCategorieAction}
          removeCategorie={this.props.removeCategorieAction}
        />);
      }
    }
    console.log(output);
    return output;
  }

  render() {
    const { categories } = this.props;
    return(
      <div className='categories'>
        {this.takeCategories(categories)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

const mapDispatchToProps = {
  addCategorieAction,
  removeCategorieAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorieContainer);