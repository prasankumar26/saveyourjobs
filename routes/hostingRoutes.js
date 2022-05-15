import express from 'express'
const router = express.Router()

import {createHosting,getAllHosting} from '../controllers/hostingController.js'

router.route('/hosting-add').post(createHosting)
router.route('/hosting-list').get(getAllHosting)


export default router