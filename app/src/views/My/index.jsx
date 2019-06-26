import React, { Component } from 'react'
import style from './index.scss'
import { Link } from 'react-router-dom'

class My extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={style.mycontainer}>
        这是My
      </div>
    );
  }
}

export default My
