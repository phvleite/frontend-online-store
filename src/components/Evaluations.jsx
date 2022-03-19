import React from 'react';
import { PropTypes } from 'prop-types';

class Evaluations extends React.Component {
  render() {
    const { evaluation } = this.props;
    console.log(evaluation);
    // const { email, rating, message } = evaluation;
    return (
      <div>
        {/* <span>{`email: ${email}`}</span>
        <span>{`rating: ${rating}`}</span>
        <span>{`message: ${message}`}</span> */}
      </div>
    );
  }
}

Evaluations.propTypes = {
  evaluation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Evaluations;
