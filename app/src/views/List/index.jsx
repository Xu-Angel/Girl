import React, { Component } from 'react'
// import './index.scss'
import style from './index.scss'
import { getList } from '../../api/girl'
import { Link } from 'react-router-dom'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: null,
      pageSize: 20,
      page: 1
    }
  }
  componentDidMount() {
    console.log(this);
    const that = this
    getList({
      page: this.state.page,
      pageSize: this.state.pageSize
    }).then(rs => {
      that.setState({ items: rs.data.items, page: 2 })
      touch(document.querySelector('.list-container'), {
        up(e) {
          if (e.distanceY < -50) {
            getList({
              page: that.state.page,
              pageSize: that.state.pageSize
            }).then(rs => {
              that.setState({ items: that.state.items.concat(rs.data.items), page: that.state.page + 1 })
            })
          }
        }
      })
    })
  }
  
  render() {
    const items = this.state.items
    return (
      <div className={style.listContainer}>
        {
          items && items.map((v, i) => (v.status && <Link to={`./detail?id=${v.realUid}`} className="ava-wrap" key={i} id={v.realUid}><img alt=" " className="ava" src={v.image} /></Link>)
              )
          }
      </div>
    );
  }
}
function touch(ele, option) {
  ele.addEventListener("touchstart", function(e) {
    this.startX = e.touches[0].pageX
    this.startY = e.touches[0].pageY
  })
  ele.addEventListener("touchmove", function(e) {
    this.isMove = true;
    this.endX = e.touches[0].pageX
    this.endY = e.touches[0].pageY
    this.distanceX = this.endX - this.startX
    this.distanceY = this.endY - this.startY
  })
  ele.addEventListener("touchend", function() {
    if (this.isMove) {
      this.isMove = false
      //如果滑动距离太短
      if (Math.abs(this.distanceX) < 2 && Math.abs(this.distanceY) < 2) {
        return false;
      }
      let angle = Math.atan2(this.distanceY, this.distanceX) * 180 / Math.PI
      const EVENT = {
        self: this,
        distanceX: this.distanceX || 0,
        distanceY: this.distanceY || 0,
        startX: this.startX,
        startY: this.startY,
        endX: this.endX,
        endY: this.endY
      }
      if (angle >= -45 && angle < 45) {
        // console.log('向右')
        option.right && option.right(EVENT)
      } else if (angle >= 45 && angle < 135) {
        // console.log('向下')
        option.down && option.down(EVENT)
      } else if (angle >= -135 && angle < -45) {
        option.up && option.up(EVENT)
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        // console.log('向左')
        option.left && option.left(EVENT)
      }
    }
  })
}



export default List
