import { PropTypes } from 'prop-types';
import React from 'react';
import ShoppingCartButton from '../components/ShoppingCartButton';
import EvaluationForm from '../components/EvaluationForm';

class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      details: { },
    };
  }

  componentDidMount() {
    this.productDetail();
  }

  addItem = () => {
    const { addItem } = this.props;
    const { details } = this.state;
    addItem(details);
  }

  productDetail = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({}, async () => {
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const searchId = await response.json();
      this.setState({ details: searchId });
    });
  }

  // starWhite = () => (<span role="img" aria-label="withe-star">&#9734;</span>);

  // starYellow = () => (<span role="img" aria-label="yellow-star">&#11088;</span>);

  render() {
    const { details } = this.state;

    return (
      <>
        <ShoppingCartButton />
        <h4 data-testid="product-detail-name">{details.title}</h4>
        <img src={ details.thumbnail } alt={ details.title } />
        <p>{ details.price }</p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          value={ details.id }
          onClick={ this.addItem }
        >
          Adicionar ao carrinho
        </button>
        <EvaluationForm productId={ details.id } />
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addItem: PropTypes.func.isRequired,
};

export default Details;
