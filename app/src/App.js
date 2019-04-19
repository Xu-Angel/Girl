import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import Home from './views/Home/index'
import List from './views/List/index'
import Detail from './views/Detail/index'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// 处理页面显示 总入口

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/list' component={List}/>
        <Route exact path='/detail' component={Detail}/>
      </Switch>
      </BrowserRouter>
    )
  }
}


export default hot(module)(App);
