const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')


//////////////////////
////////READ/////////
////////////////////
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})


//////////////////////
///////CREATE////////
////////////////////
blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid.' })
  }

  const user = request.user
  if (user === null)
    response.status(404).json({ error: 'user not found' })


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user.id
  })


  if ((blog.title === undefined || !blog.title.length > 0) || (blog.url === undefined || !blog.url.length > 0)) {
    response.status(400).json({ error: 'title or url undefined' })
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
blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid.' })
  }

  const user = request.user

  /* Checking if id is valid */
  if (mongoose.Types.ObjectId.isValid(request.params.id)) {
    const blog = await Blog.findById(request.params.id)
    if (blog != null) { // Checking if the id exists in DB.
      if (user._id.toString() === blog.user[0].toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        let newUser = user
        newUser.blogs = newUser.blogs.filter(userBlog => {
          return userBlog.toString() !== request.params.id.toString()
        })
        await User.findByIdAndUpdate(newUser._id, newUser, { new: true })
        response.status(204).end()
      }
      else {
        response.status(401).json({ error: 'You are not authorized to remove this blog.' })
      }
    } else {
      response.status(404).end()
    }
  }
  else {  // if it isn't valid, throw 404.
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