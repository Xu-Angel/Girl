import express from 'express'
import Log from '../controller/log'
const router = express.Router()

router.post('/getVisit', Log.getVisit)
router.post('/delReq', Log.delReq)

export default router