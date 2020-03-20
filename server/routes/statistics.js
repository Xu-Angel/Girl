import express from 'express'
import Statistics from '../controller/statistics'
const router = express.Router()

router.get('/getLine', Statistics.getLine)
// TODO:
// router.post('/delGirl', Girl.delById);


export default router