
import express from 'express'
import Ip from '../controller/ip'
const router = express.Router()

router.post('/startSpiIp', Ip.startSpiIp)
router.post('/startSpiIpPool', Ip.startSpiIpPool)
router.get('/distinct', Ip.distinct)
router.post('/getIpList', Ip.getIpList)
router.post('/checkIp', Ip.checkIp)

export default router