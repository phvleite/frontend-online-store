import { PropTypes } from 'prop-types';
import React from 'react';
import Evaluation from '../components/Evaluation';
import EvaluationForm from '../components/EvaluationForm';
import ShoppingCartButton from '../components/ShoppingCartButton';
import '../css/Details.css';

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
    const { match: { params: { id } } } = this.props;
    const { details } = this.state;
    const { evaluations, submitEvaluation } = this.props;

    return (
      <div className="box-details">
        <div className="box-product-cart-button">
          <h3 data-testid="product-detail-name">{details.title}</h3>
          <ShoppingCartButton />
        </div>
        <div className="box-details-body">
          <div className="box-img-details">
            <img src={ details.thumbnail } alt={ details.title } />
          </div>
          <div className="box-infos-details">
            <p className="price-product">{ `R$ ${details.price}` }</p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              value={ details.id }
              onClick={ this.addItem }
              className="btn-add-details"
            >
              Adicionar ao carrinho
            </button>
            <EvaluationForm productId={ id } submitEvaluation={ submitEvaluation } />
            <div>
              {evaluations[details.id] && evaluations[details.id].map((evaluation) => (
                <Evaluation
                  key={ evaluation.id }
                  email={ evaluation.email }
                  rating={ evaluation.rating }
                  message={ evaluation.message }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
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
  evaluations: PropTypes.objectOf(PropTypes.any).isRequired,
  submitEvaluation: PropTypes.func.isRequired,
};

export default Details;
