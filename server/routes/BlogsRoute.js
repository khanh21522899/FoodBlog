const express = require('express')
const { getAllBlogs, getBlog, getBlogsFromPage, createBlog } = require('../controller/blogController')

const requireAuth = require('../middleware/requireAuth.js')
const router = express.Router()

router.get('/allBlogs', getAllBlogs);
router.get('/', getBlogsFromPage);
router.get('/:id', getBlog);


router.post('/create-blog', requireAuth, createBlog)










module.exports = router
