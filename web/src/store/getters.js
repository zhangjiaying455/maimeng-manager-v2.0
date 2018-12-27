const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.username,
  roles: state => state.user.roles,
  dict:state=>state.user.dict,
  updateTableList: state =>state.updateTableList
}
export default getters
