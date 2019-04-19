import React, { Component } from 'react'
import List from '../List/index'
import './index.scss'
class Home extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="App">
        <Bottom />
        <List />
      </div>
    );
  }
}

class Bottom extends Component {
  render() {
    return (
      <div className="bottom">
        <div>列表</div>
        <div>列表</div>
        <div>我的</div>
      </div>
    )
  }
}
export default Home
