import _ from 'lodash'; // biblioteca que possui a função range
import { PropTypes } from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class EvaluationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: '',
      buttonDisabled: true,
      rating: '',
    };
  }

  evaluationRatings = () => {
    const end = 6;
    const ratingsArray = _.range(1, end).map((index) => ( // _.range cria um array de números de 1 a 5. O intervalo é aberto na direita (6 fica de fora).
      <label
        htmlFor={ `rating-${index}` }
        key={ index }
        className="rating-index"
      >
        <input
          data-testid={ `${index}-rating` }
          type="radio"
          name="rating"
          value={ index }
          className="input-radio-rating"
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

  // função chamada após clicar no botão. Cria um obj com os estados e passa como parametro para a func submitEvaluation.
  saveEvaluation = (event) => {
    event.preventDefault();

    const { productId, submitEvaluation } = this.props;
    const { email, rating, message } = this.state;
    const id = uuidv4();

    const evaluation = {
      id,
      email,
      rating,
      message,
    };

    submitEvaluation(productId, evaluation);

    // reinicia os estados dos inputs depois de submeter a avaliação
    document.querySelector('input[name="rating"]:checked').checked = false;
    this.setState({
      email: '',
      message: '',
      buttonDisabled: true,
    });
  }

  render() {
    const { email, message, buttonDisabled } = this.state;
    return (
      <div className="box-evaluation-form">
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
            className="input-email"
          />

          <div
            name="rating"
            onChange={ this.onInputChange }
            className="rating-evaluation"
          >
            {this.evaluationRatings()}
          </div>

          <textarea
            data-testid="product-detail-evaluation"
            name="message"
            placeholder="Mensagem (opcional)"
            value={ message }
            onChange={ this.onInputChange }
            className="message-evaluation"
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            disabled={ buttonDisabled }
            onClick={ this.saveEvaluation }
            className="btn-submit-evalution"
          >
            Avaliar
          </button>
        </form>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  productId: PropTypes.string.isRequired,
  submitEvaluation: PropTypes.func.isRequired,
};

export default EvaluationForm;
