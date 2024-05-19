import { Router } from 'express'
import { addBlog, getblogs, update_blog } from './controller/Blog.js'

const router = Router()

router.post('/', addBlog)
router.get('/', getblogs)
router.patch('/:id', update_blog)

export default router
