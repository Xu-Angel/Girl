import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { hot } from 'react-hot-loader'
import { getList } from './api/girl.js'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null
    }
  }
  componentDidMount() {
    getList({
      page: 1,
      pageSize: 10
    }).then(rs => {
      this.setState({ items: rs.data.items })
    })
  }
  render() {
    const items = this.state.items
    console.log(items);
    return (
      <div className="App">
        <header className="App-header">
          <ul>
          {
            items && items.map((v, i) => (
              <li key={i}>
                <p>{v.nickname}</p>
              </li>)
            )
            }
            </ul>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="./"
          >
            Home
          </a>
          <a
            className="App-link"
            href="./Game"
          >
            Game
          </a>
          <a
            className="App-link"
            href="./Toggle"
          >
            Toggle
          </a>
          <a
            className="App-link"
            href="./Hook"
          >
            Hook
          </a>
          <a
            className="App-link"
            href="./State"
          >
            State
          </a>
        </header>
      </div>
    );
  }
}

export default hot(module)(App);
