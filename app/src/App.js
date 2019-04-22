import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import List from './views/List/index'
import Detail from './views/Detail/index'
import Bottom from './views/Bottom/index'
import My from './views/My/index'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// 处理页面显示 总入口
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Bottom/>
        <Switch>
          <Route exact path='/' component={List}/>
          <Route exact path='/list' component={List}/>
          <Route exact path='/detail' component={Detail}/>
          <Route exact path='/my' component={My}/>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default hot(module)(App);
