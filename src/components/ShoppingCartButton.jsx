import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import '../css/Home.css';

class ShoppingCartButton extends React.Component {
  render() {
    return (
      <div className="shop-cart">
        <Link to="/cart" data-testid="shopping-cart-button">
          <BsCart className="cart-icon" />
          {/* <img
            className="cart-image"
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="imagem-do-carrinho-de-compras"
          /> */}
        </Link>
      </div>
    );
  }
}

export default ShoppingCartButton;
