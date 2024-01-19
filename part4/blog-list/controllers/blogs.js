const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else if (blog) {
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(404).end()
  }


})


module.exports = blogsRouter