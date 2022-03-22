import { PropTypes } from 'prop-types';
import { BsCart } from 'react-icons/bs';
import React from 'react';
import Items from '../components/Items';
import '../css/ShoppingCart.css';

class ShoppingCart extends React.Component {
  render() {
    const { items, incItem, decItem, removeItem } = this.props;

    return (
      <div className="box-shopping-cart">
        {items.length === 0 ? (
          <div className="box-info-empty-cart">
            <BsCart className="cart-icon-empty" />
            <p data-testid="shopping-cart-empty-message" className="empty-cart-message">
              Seu carrinho está vazio
            </p>
          </div>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={ item.id }>
                <Items
                  itemId={ item.id }
                  productName={ item.title }
                  productImage={ item.thumbnail }
                  productPrice={ item.price }
                  quantity={ item.quantity }
                  incItem={ incItem }
                  decItem={ decItem }
                  removeItem={ removeItem }
                />
              </li>
            ))}
          </ul>

        )}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  incItem: PropTypes.func.isRequired,
  decItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default ShoppingCart;
