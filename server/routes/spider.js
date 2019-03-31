
import express from 'express'
import Spider from '../controller/spider'
const router = express.Router()

router.post('/spiDetailByRealUid', Spider.spiDetailByRealUid)
router.post('/distinctGirl', Spider.distinctGirl)
router.get('/getSipderConfig', Spider.getSipderConfig)
router.post('/updateTaskConfig', Spider.updateTaskConfig)
router.post('/exportRealUid', Spider.exportRealUid)

// TODO:
// router.post('/delGirl', Girl.delById);


export default router