const G = global
import socketGetDetailStatus from './getDetailStatus'
import socketGetListStatus from './getListStatus'

export default IO => {
  socketGetDetailStatus(IO, G)
  socketGetListStatus(IO, G)
}
