import { Router } from 'express'
import { listProperties, updateProperty } from './properties.controller.js'

const router = Router()

router.get('/', listProperties)
router.put('/:id', updateProperty)
router.patch('/:id', updateProperty)

export default router

