import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/App.scss';
import { graphqlRequestWithNoToken } from './services/graphql.service.';

class App extends Component {

  handleOnSubmit = async (e) => {
    e.preventDefault();
    const inputs = Array.from(e.target).filter(el => el.name);
    const email = (inputs.find(el => el.name === 'email')).value;
    const pwd = (inputs.find(el => el.name === 'password')).value;
    const data = await graphqlRequestWithNoToken({
      query: `mutation {
        logIn(email: "${email}", password: "${pwd}")
      }`
    });
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <form onSubmit={this.handleOnSubmit}>
          <input type="text" name="email"/>
          <input type="password" name="password"/>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default App;
