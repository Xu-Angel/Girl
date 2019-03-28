
import express from 'express'
import Spider from '../controller/spider'
const router = express.Router()

router.get('/spiDetailByRealUid', Spider.spiDetailByRealUid)
router.get('/getSipderConfig', Spider.getSipderConfig)
// TODO:
// router.post('/delGirl', Girl.delById);


export default router