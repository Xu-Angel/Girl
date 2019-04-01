
import express from 'express'
import Admin from '../controller/admin'
const router = express.Router()

router.post('/login', Admin.login)
// TODO:
// router.post('/register', Admin.register);
router.post('/logout', Admin.logout)
router.post('/getList', Admin.getList)
router.post('/delAdmin', Admin.delAdmin)
// router.get('/all', Admin.getAllAdmin);
// router.get('/count', Admin.getAdminCount);
router.get('/info', Admin.getAdminInfo)
// router.post('/update/avatar/:admin_id', Admin.updateAvatar);

export default router