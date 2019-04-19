/* 
State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。
*/

// const Clock = (props) => {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   )
// }

/* 
改写
*/
import React from 'react';
import { hot } from 'react-hot-loader'
class Clock extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      // 不要直接修改 State 构造函数是唯一可以给 this.state 赋值的地方：
      date: new Date()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
  // 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。 此代码可能会无法更新计数器：
  // FIXME:Wrong
    this.setState({
      counter: this.state.counter + this.props.increment
    })
  // Correct 
    this.setState((state, props) => ({
     counter: state.counter + props.increment
   }))
    // 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
      <h1>Hello, world!</h1>
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
    )
  }
}
export default hot(module)(Clock);