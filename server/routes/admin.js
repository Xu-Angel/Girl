import express from 'express'
import Admin from '../controller/admin'
const router = express.Router()

router.post('/login', Admin.login)
router.post('/updateInfo', Admin.updateInfo)
router.post('/logout', Admin.logout)
router.post('/getList', Admin.getList)
router.post('/delAdmin', Admin.delAdmin)
router.get('/info', Admin.getAdminInfo)
router.post('/updateAvatar', Admin.updateAvatar)

export default router