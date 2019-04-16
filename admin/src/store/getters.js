const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  region: state => state.user.region,
  roles: state => state.user.roles,
  id: state => state.user.id,
  createTime: state => state.user.createTime
}
export default getters
