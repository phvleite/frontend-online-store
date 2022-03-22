import { PropTypes } from 'prop-types';
import { BsCartX, BsCartPlus, BsCartDash } from 'react-icons/bs';
import React from 'react';

class Items extends React.Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      quantity,
      itemId,
      removeItem,
      decItem,
      incItem } = this.props;

    return (
      <div className="box-item-cart">
        <div className="box-img-item-cart">
          <img src={ productImage } alt={ productName } />
        </div>
        <div className="box-details-item-cart">
          <p data-testid="shopping-cart-product-name">{productName}</p>
          <p>{`R$ ${productPrice.toFixed(2)}`}</p>
          <div className="btns-item-cart">
            <button
              type="button"
              value={ itemId }
              data-testid="product-decrease-quantity"
              onClick={ decItem }
              className="btn-decrease-qtd"
            >
              -
              {/* <BsCartDash /> */}
            </button>
            <div className="box-quantity">
              <span data-testid="shopping-cart-product-quantity">{quantity}</span>
            </div>
            <button
              value={ itemId }
              type="button"
              data-testid="product-increase-quantity"
              onClick={ incItem }
              className="btn-increase-qtd"
            >
              +
              {/* <BsCartPlus /> */}
            </button>
            <button
              value={ itemId }
              onClick={ removeItem }
              type="button"
              className="btn-remove-item"
            >
              X
              {/* <BsCartX /> */}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Items.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  itemId: PropTypes.string.isRequired,
  decItem: PropTypes.func.isRequired,
  incItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default Items;
