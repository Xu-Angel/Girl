const G = global
import socketGetDetailStatus from './getDetailStatus'
import socketGetListStatus from './getListStatus'
import socketGetIpStatus from './getIpStatus'

export default IO => {
  socketGetDetailStatus(IO, G)
  socketGetListStatus(IO, G)
  socketGetIpStatus(IO, G)
}
