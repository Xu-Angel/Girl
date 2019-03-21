import IDsModel from '../model/ids'

export default class BaseComponent {
  constructor() {
    this.idList = ['admin_id', 'girl_id'];
    // this.uploadImg = this.uploadImg.bind(this)
  }

  //获取id列表
  async getId(type) {
    console.log('11', this.idList, type);
    if (!this.idList.includes(type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
      return
    }
    try {
      console.log('18'); // 
      const idData = await IDsModel.findOne();
      console.log(idData, '20');
      idData[type]++;
      await idData.save();
      console.log(23);
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