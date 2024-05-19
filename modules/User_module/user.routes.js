import { Router } from 'express'
import {
  addUser,
  getAllUsers,
  getUser,
  get_user_by_name,
  signin,
  update_user
} from './controller/User.js'

const router = Router()

router.post('/', addUser)
router.get('/', getAllUsers)
router.get('/one_user', getUser)
router.post('/signin', signin)
router.patch('/', update_user)
router.get('/byname', get_user_by_name)
export default router
