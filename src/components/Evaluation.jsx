import { PropTypes } from 'prop-types';
import React from 'react';

class Evaluation extends React.Component {
  render() {
    const { email, rating, message } = this.props;

    return (
      <div className="box-evaluation">
        <p>{`e-Mail: ${email}`}</p>
        <p>{`Classificação: ${rating}`}</p>
        {
          message.length > 0 && <p>{`Mensagem: ${message}`}</p>
        }
      </div>
    );
  }
}

Evaluation.propTypes = {
  email: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Evaluation;
