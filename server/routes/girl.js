
import express from 'express'
import Girl from '../controller/girl'
const router = express.Router()

router.post('/list', Girl.getList);
// TODO:
// router.post('/delGirl', Girl.delById);


export default router