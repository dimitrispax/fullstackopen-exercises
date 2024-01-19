const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const Test = require('supertest/lib/test')

const initialBlogs = [{ // Initialized a blog list with 2 blogs.
    "title": "DevBlog",
    "author": "Dimitrios Paximadakis",
    "url": "https://devblog.gr",
    "likes": 33,
    "id": "6582c5d046a932b60f1d6467"
  },
  {
    "title": "MechBlog",
    "author": "Alexandros Paximadakis",
    "url": "https://mechblog.gr",
    "likes": 22,
    "id": "6582c874a9daf339544603a3"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const api = supertest(app)

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('blogs are 2', async () => {
//   const res = await api.get('/api/blogs')
//   expect(res.body).toHaveLength(2)
// })

// test('the unique identifier is id', async () => {
//   const res = await api.get('/api/blogs')
//   res.body.forEach(blog => {
//     expect(blog.id).toBeDefined()
//   });
// })

// test('a valid blog can be added', async () => {
//   const newBlog = {
//     "title": "CryptoBlog",
//     "author": "Mike Nirakis",
//     "url": "https://cryptoblog.gr",
//     "likes": 21122,
//     "id": "6582c874a9daf33954460789"
//   }
//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const res = await api.get('/api/blogs')
//   const bloglistTitles = res.body.map(blog => blog.title)

//   expect(res.body).toHaveLength(initialBlogs.length + 1)
//   expect(bloglistTitles).toContain('CryptoBlog')
// })

test('when likes is undefined in request, default at 0', async () => {
  const newBlog = {
    "title": "CryptoBlog",
    "author": "Mike Nirakis",
    "url": "https://cryptoblog.gr",
    "id": "6582c874a9daf33954460789"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const likes = res.body.map(blog => blog.likes)
  expect(likes).toContain(0)
})

afterAll(async () => {
  await mongoose.connection.close()
})