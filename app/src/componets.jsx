const Avatar = (props) => {
  // 我们建议从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名。
  return (
    <img className="Avatar"
      src={props.user.avatar}
      alt={props.user.name}
    />
  )
}
const UserInfo = (props) => {
  return (
    <div className="UserInfo">
    <Avatar user={props.user} />
    <div className="UserInfo-name">
      {props.user.name}
    </div>
  </div>
  )
}
/* 
最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（Button，Panel，Avatar），或者组件本身就足够复杂（App，FeedStory，Comment），那么它就是一个可复用组件的候选项。
*/
const Comment = (props) => {
  return (
    <div className="Comment">
    <UserInfo user={props.author} />
    <div className="Comment-text">
      {props.text}
    </div>
    <div className="Comment-date">
      {formatDate(props.date)}
    </div>
  </div>
  )
}