import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import Game from './Game.jsx';
import Toggle from './handleing.jsx';
import Hook from './hook.jsx';
import State from './State';
import * as serviceWorker from './serviceWorker';
/* 
https://codesandbox.io/s/vVoQVk78
 */
ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path='/Game' component={Game}/>
      <Route path='/Toggle' component={Toggle}/>
      <Route path='/Hook' component={Hook}/>
      <Route path='/State' component={State}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
