
import express from 'express'
import Spider from '../controller/spider'
const router = express.Router()

router.get('/spiDetailByRealUid', Spider.spiDetailByRealUid)
router.get('/distinctGirl', Spider.distinctGirl)
router.get('/getSipderConfig', Spider.getSipderConfig)
router.post('/updateTaskConfig', Spider.updateTaskConfig)
// TODO:
// router.post('/delGirl', Girl.delById);


export default router