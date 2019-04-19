// 这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回
/* 
https://zh-hans.reactjs.org/docs/components-and-props.html
当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在下一章节中，我们将介绍一种新的概念，称之为 “state”。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。
*/
const sum = (a, b) => {
  return a + b
}
const withdraw = (a, m) => {
  a.t -= m
}