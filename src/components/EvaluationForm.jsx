import _ from 'lodash'; // biblioteca que possui a função range
import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Evaluations from './Evaluations';

class EvaluationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: '',
      buttonDisabled: true,
      rating: '',
      evaluationsProducts: [],
      evaluationsProductsSort: [],
    };
  }

  componentDidMount() {
    this.getSavedEvaluations();
  }

  getSavedEvaluations = () => {
    const getEvalua = window.localStorage.getItem('evaluationsProducts');
    let savedEvalua = JSON.parse(getEvalua);
    if (savedEvalua === null) savedEvalua = [];
    this.setState({ evaluationsProducts: savedEvalua });

    const { productId } = this.props;

    const indexItemEvalua = savedEvalua
      .findIndex((evalua) => evalua.id === productId);

    const numberVerify = -1;
    let evaluationsProductsSort = [];

    if (indexItemEvalua !== numberVerify) {
      evaluationsProductsSort = savedEvalua[indexItemEvalua].evaluations;
    }
    console.log(evaluationsProductsSort);
    this.setState({ evaluationsProductsSort });
  };

  evaluationRatings = () => {
    const end = 6;
    const ratingsArray = _.range(1, end).map((index) => ( // _.range cria um array de números de 1 a 5. O intervalo é aberto na direita (6 fica de fora).
      <label
        htmlFor={ `rating-${index}` }
        key={ index }
      >
        <input
          data-testid={ `${index}-rating` }
          type="radio"
          name="rating"
          value={ index }
        />
        {index}
      </label>
    ));

    return ratingsArray;
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.enableButton());
  }

  enableButton = () => {
    const { rating } = this.state;
    const email = document.getElementById('email');
    const validateEmail = email.validity.valid;
    const validateRatings = parseInt(rating, 10) > 0;

    if (validateEmail && validateRatings) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  submitEvaluation = (event) => {
    event.preventDefault();
    const { productId } = this.props;
    const { email, rating, message, evaluationsProducts } = this.state;
    const myUUID = uuidv4();

    const indexItemEvalua = evaluationsProducts
      .findIndex((evalua) => evalua.id === productId);

    let evaluation = {};
    const numberVerify = -1;

    if (indexItemEvalua === numberVerify) {
      evaluation = { id: productId, evaluations: [{ myUUID, email, rating, message }] };
      this.setState((prevState) => ({
        evaluationsProducts: [...prevState.evaluationsProducts, evaluation],
      }));
    } else {
      evaluationsProducts[indexItemEvalua]
        .evaluations.push({ myUUID, email, rating, message });
      this.setState({ evaluationsProducts });
    }

    this.setState({
      email: '',
      message: '',
      buttonDisabled: true,
      rating: '',
    }, () => this.saveEvaluationsProducts());
    // chave -> id: []
    // logica de salvar no localStorage ainda vai entrar aqui.
  }

  saveEvaluationsProducts = () => {
    const { evaluationsProducts } = this.state;
    const { productId } = this.props;

    const indexItemEvalua = evaluationsProducts
      .findIndex((evalua) => evalua.id === productId);

    localStorage.setItem('evaluationsProducts', JSON.stringify(evaluationsProducts));

    const evaluationsProductsSort = evaluationsProducts[indexItemEvalua].evaluations;
    console.log(evaluationsProductsSort);
    this.setState({ evaluationsProductsSort });
  };

  render() {
    const { email, message, buttonDisabled, evaluationsProductsSort } = this.state;
    console.log(evaluationsProductsSort);
    return (
      <div>
        <h2> Avaliações </h2>
        <form id="form" name="form" className="form">
          <input
            data-testid="product-detail-email"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={ email }
            onChange={ this.onInputChange }
            required
          />

          <div name="rating" onChange={ this.onInputChange }>
            {this.evaluationRatings()}
          </div>

          <textarea
            name="message"
            placeholder="Mensagem (opcional)"
            value={ message }
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="save-button"
            disabled={ buttonDisabled }
            onClick={ this.submitEvaluation }
          >
            Avaliar
          </button>
        </form>
        {evaluationsProductsSort.map((evaluation) => (
          <div key={ evaluation.myUUID }>
            <Evaluations evaluation={ evaluation.evaluations } />
          </div>
        ))}
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default EvaluationForm;
