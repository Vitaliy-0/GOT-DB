import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component{

    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false,
        pathes: {
          main: '/',
          characters: '/characters/',
          houses: '/houses/',
          books: '/books/'
        }
    };

    componentDidCatch() {
      console.log('error');
      this.setState({
        error: true
      })
    }

    toggleRandomChar = () => {
      this.setState(state => {
        return {
          showRandomChar: !state.showRandomChar
        }
      })
    }



    render() {
      const char = this.state.showRandomChar ? <RandomChar/> : null;
      const pathes = {...this.state.pathes};

      if(this.state.error) {
        return <ErrorMessage/>;
      }

      return (
            <Router> 
              <div className='app'>
                  <Container>
                      <Header />
                  </Container>
                  <Container>
                      <Row>
                          <Col lg={{size: 5, offset: 0}}>
                          {char}
                          <button 
                              className="toggle-btn"
                              onClick={this.toggleRandomChar}>Toggle random character</button>
                          </Col>
                      </Row>
                      <Route path={pathes.characters} exact component={CharacterPage} />
                      <Route path={pathes.houses} exact component={HousesPage} />
                      <Route path={pathes.books} exact component={BooksPage} />
                      <Route path={`${pathes.books}:id`} render={ ({match}) => {
                          const {id} = match.params;
                          pathes.book = `/books/${id}`;
                          return <BooksItem bookId={id}/>
                      }} />
                  </Container>
              </div>
            </Router>
    ); 
    }
};