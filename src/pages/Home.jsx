import React from 'react';
import Menu from '../components/Menu';
import Loading from '../components/Loading';
import { getCategories } from '../services/api';
import ShoppingCartButton from '../components/ShoppingCartButton';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      load: false,
      categories: [],
    };
  }

  componentDidMount() {
    this.returnGetCategories();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  returnGetCategories = async () => {
    this.setState(
      { load: true },
      async () => {
        const dbCategories = await getCategories();
        this.setState({
          load: false,
          categories: dbCategories,
        });
      },
    );
  }

  render() {
    const { search, categories, load } = this.state;
    return (
      <div>
        { load ? <Loading />
          : <ul><Menu categories={ categories } /></ul> }
        <input
          type="text"
          name="search"
          value={ search }
          onChange={ this.handleChange }
        />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <ShoppingCartButton />
      </div>
    );
  }
}

export default Home;
