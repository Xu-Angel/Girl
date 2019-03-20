import { Ids } from '../model/index'

export default class BaseComponent {
  constructor() {
    this.idList = ['admin_id'];
    // this.uploadImg = this.uploadImg.bind(this)
  }

  //获取id列表
  async getId(type) {
    if (!this.idList.includes(type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
      return
    }
    try {
      const idData = await Ids.findOne();
      idData[type]++;
      await idData.save();
      return idData[type]
    } catch (err) {
      console.log('获取ID数据失败');
      throw new Error(err)
    }
  }
  // TODO:
  // async uploadImg(req, res, next) {
  //   //...
  // }
}