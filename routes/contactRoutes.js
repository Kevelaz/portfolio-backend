import { Router } from 'express';
import * as contactControl from '../controllers/contactController.js'

const router = Router()

router.post('/', contactControl.handleContactInfo)

export { router }