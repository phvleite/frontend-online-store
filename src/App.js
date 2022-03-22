import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Details from './pages/Details';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      evaluations: {},
    };
  }

  componentDidMount() {
    this.getSavedEvaluations();
  }

  getSavedEvaluations = () => {
    const savedEvaluations = localStorage.getItem('evaluations');
    const evaluations = JSON.parse(savedEvaluations);

    if (evaluations) {
      this.setState({
        evaluations,
      });
    }
  }

  // Adiciona uma nova avaliação ao estado evaluations e atualiza o localStorage.
  submitEvaluation = (productId, evaluation) => {
    const { evaluations } = this.state;

    const prevEvaluations = evaluations[productId]; // prevEvaluations é um array de objetos.
    if (prevEvaluations) {
      evaluations[productId] = [...prevEvaluations, evaluation]; // existindo essa chave, adc nova avaliação ao array ja existente.
    } else {
      evaluations[productId] = [evaluation]; // não existindo, cria, passando a avaliação dentro de um array.
    }

    this.setState({
      evaluations,
    }, () => {
      localStorage.setItem('evaluations', JSON.stringify(evaluations));
    });
  }

  // Alterada a lógica para inserir os objetos no estado items
  addItem = async (productObj) => {
    const { items } = this.state;

    // productObj corresponde ao objeto que está sendo mapeado no Home, renderizando os ProductCards

    // Implementada lógica para adicionar ítems no carrinho
    const indexItems = items.findIndex((item) => item.id === productObj.id);

    const numberVerify = -1;

    if (indexItems === numberVerify) {
      productObj.quantity = 1;
      items.push(productObj);
    } else {
      items[indexItems].quantity += 1;
    }

    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('product', JSON.stringify(items));
    });
  }

  // Incrementa um ítem na página do carrinho atravéz do botão +
  incItem = async ({ target }) => {
    const { value } = target;
    const { items } = this.state;
    console.log(target);

    // Implementada lógica para incrementar um ítem do carrinho
    const indexItems = items.findIndex((item) => item.id === value);

    if (items[indexItems].quantity >= 1) {
      items[indexItems].quantity += 1;
    }

    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('product', JSON.stringify(items));
    });
  }

  // Decrementa um ítem na página do carrinho atravéz do botão -
  decItem = async ({ target }) => {
    const { value } = target;
    const { items } = this.state;

    // Implementada lógica para decrementar um ítem do carrinho
    const indexItems = items.findIndex((item) => item.id === value);

    if (items[indexItems].quantity >= 1) {
      items[indexItems].quantity -= 1;
    } else {
      this.removeItem({ target });
    }

    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('product', JSON.stringify(items));
    });
  }

  removeItem = async ({ target }) => {
    const { value } = target;
    const { items } = this.state;

    // Implementada lógica para remover um ítem do carrinho
    const indexItems = items.findIndex((item) => item.id === value);

    items.splice(indexItems, 1);
    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('product', JSON.stringify(items));
    });
  }

  render() {
    const { items, evaluations } = this.state;

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/details/:id"
              render={ (props) => (
                <Details
                  { ...props }
                  addItem={ this.addItem }
                  evaluations={ evaluations }
                  submitEvaluation={ this.submitEvaluation }
                />
              ) }
            />
            <Route
              exact
              path="/cart"
              render={ () => (
                <ShoppingCart
                  removeItem={ this.removeItem }
                  decItem={ this.decItem }
                  incItem={ this.incItem }
                  items={ items }
                />
              ) }
            />
            <Route exact path="/" render={ () => <Home addItem={ this.addItem } /> } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
