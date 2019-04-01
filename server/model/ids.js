import mongoose from 'mongoose'
const Schema = mongoose.Schema

const idsSchema = new Schema({
  admin_id: { type: Number, default: 0 },
  girl_id: { type: Number, default: 0 },
  img_id: { type: Number, default: 0 },
})

const Ids = mongoose.model('id', idsSchema)

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      admin_id: 0,
      girl_id: 0,
      img_id: 0
    });
    newIds.save()
  }
})

export default Ids