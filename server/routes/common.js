import express from 'express'
import Common from '../controller/common'
const router = express.Router()

router.get('/getCounts', Common.getCounts)
// TODO:
// router.post('/delGirl', Girl.delById);


export default router