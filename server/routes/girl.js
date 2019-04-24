
import express from 'express'
import Girl from '../controller/girl'
const router = express.Router()

router.post('/list', Girl.getList)
// router.get('/distinct', Girl.distinct)
// router.get('/exportRealUid', Girl.exportRealUid)
router.post('/getDetail', Girl.getDetail)
router.post('/updateTop', Girl.updateTop)
// TODO:
// router.post('/delGirl', Girl.delById);


export default router