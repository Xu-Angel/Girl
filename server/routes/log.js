import express from 'express'
import Log from '../controller/log'
const router = express.Router()

router.post('/getVisit', Log.getVisit)
router.post('/delReq', Log.delReq)
router.post('/delFile', Log.delFile)
router.post('/getFile', Log.getFile)

export default router