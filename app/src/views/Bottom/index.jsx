
import React, { Component } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
class Bottom extends Component {
  render() {
    return (
      <div className="bottom">
        <div><Link to="./list">列表</Link></div>
        <div><Link to="./">首页</Link></div>
        <div><Link to="./my">我的</Link></div>
      </div>
    )
  }
}

export default Bottom