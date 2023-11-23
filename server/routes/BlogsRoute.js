const express = require('express')
const { getAllBlogs, getBlog, getBlogsFromPage } = require('../controller/blogController')

const router = express.Router()

router.get('/allBlogs', getAllBlogs);
router.get('/', getBlogsFromPage);
router.get('/:id', getBlog);










module.exports = router
