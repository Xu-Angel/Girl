import express from 'express'
import Statistics from '../controller/statistics'
const router = express.Router()

router.get('/getLine', Statistics.getLine)
router.get('/getMarriage', Statistics.getMarriage)
router.get('/getWords', Statistics.getWords)
// TODO:
// router.post('/delGirl', Girl.delById);


export default router