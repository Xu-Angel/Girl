import React, { Component } from 'react'
import './index.scss'
import { getList } from '../../api/girl'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null
    }
  }
  componentDidMount() {
    getList({
      page: 1,
      pageSize: 20
    }).then(rs => {
      this.setState({ items: rs.data.items })
    })
  }
  render() {
    const items = this.state.items
    return (
      <div className="list-container">
        <Link to={{path : ' /sort ' , state : { name : 'sunny' }}}>
        {
          items && items.map((v, i) => (<div className="ava-wrap" key={i} id={v.realUid} onClick={() => window.location.href = `./detail?id=${v.realUid}`}><img alt=" " className="ava" src={v.image} /></div>)
              )
          }
</Link>
      </div>
    );
  }
}

export default List
