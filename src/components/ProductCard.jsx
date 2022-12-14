import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

class ProductCard extends React.Component {
  render() {
    const { productName, productImage, productPrice,
      productId, addItem, productObj } = this.props;
    return (
      <div className="box-card">
        <Link
          to={ `/details/${productId}` }
          data-testid="product-detail-link"
          className="box-link-card"
        >
          <div className="box-product-name-card">
            <p data-testid="product">{productName}</p>
          </div>
          <div className="box-img-card">
            <img src={ productImage } alt={ productName } />
          </div>
          <div className="box-price-card">
            <p>{`R$: ${productPrice}`}</p>
          </div>
        </Link>
        <button
          className="btn-add-cart-card"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addItem(productObj) } // Objeto passado via props usado como parâmetro da função addItem

        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  productObj: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductCard;
