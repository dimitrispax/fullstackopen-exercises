const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')

//////////////////////
////////READ/////////
////////////////////
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('Users')
  response.json(blogs)
})
//////////////////////
///////CREATE////////
////////////////////
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id
  })

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else if (blog) {
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } else {
    response.status(404).end()
  }
})
//////////////////////
///////DELETE////////
////////////////////
blogsRouter.delete('/:id', async (request, response) => {
  /* Checking if id is valid */
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    const res = await Blog.findByIdAndDelete(request.params.id)
    if (res !== null) // Checking if the id exists in DB.
      response.status(204).end()
    else
      response.status(404).end()
  } else {  // if it isn't valid, throw 404.
    response.status(404).end()
  }
})
//////////////////////
///////UPDATE////////
////////////////////
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  }

  /* Checking if id is valid */
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    if (res !== null) // Checking if the id exists in DB.
      response.status(200).json(newBlog)
    else
      response.status(404).end()
  } else {  // if it isn't valid, throw 404.
    response.status(404).end()
  }



})

module.exports = blogsRouter