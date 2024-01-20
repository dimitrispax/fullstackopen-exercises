const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

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

//   expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
//   expect(bloglistTitles).toContain('CryptoBlog')
// })

// test('when likes is undefined in request, default at 0', async () => {
//   const newBlog = {
//     "title": "CryptoBlog",
//     "author": "Mike Nirakis",
//     "url": "https://cryptoblog.gr",
//     "id": "6582c874a9daf33954460789"
//   }
//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const res = await api.get('/api/blogs')
//   const likes = res.body.map(blog => blog.likes)
//   expect(likes).toContain(0)
// })

// test('return 400 status when title or url not filled', async () => {
//   const newBlog = {
//     "title": "CryptoBlog",
//     "author": "Mike Nirakis",
//     "id": "6582c874a9daf33954460789"
//   }
//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(400)
// })

// test('data deletion is successful', async () => {
//   await api
//     .delete('/api/blogs/65abd6aab205440f800f81bb')
//     .expect(204)

//   const res = await api.get('/api/blogs')
//   expect(res.body).toHaveLength(helper.initialBlogs.length - 1)
// })

// test('data deletion is not successful because blog not found', async () => {
//   await api
//     .delete('/api/blogs/65abd6aab205440f800f81bc')
//     .expect(404)

//   const res = await api.get('/api/blogs')
//   expect(res.body).toHaveLength(helper.initialBlogs.length)
// })

// test('data deletion is not successful because id is invalid', async () => {
//   await api
//     .delete('/api/blogs/325235235')
//     .expect(404)

//   const res = await api.get('/api/blogs')
//   expect(res.body).toHaveLength(helper.initialBlogs.length)
// })

test('data update is successful', async () => {

  const newBlog = {
    "title": "TestBlog",
    "author": "Vlakas Vlakeiou",
    "url": "https://testblog.gr",
    "likes": 3
  }
  await api
    .put('/api/blogs/65abd6aab205440f800f81bb')
    .send(newBlog)
    .expect(200)

  const res = await api.get('/api/blogs')
  const updatedBlog = res.body.find(updatedBlog => updatedBlog.title === "TestBlog")
  expect(updatedBlog.likes).toBe(3)
})

test('data update is not successful because blog not found', async () => {

  const newBlog = {
    "title": "TestBlog",
    "author": "Vlakas Vlakeiou",
    "url": "https://testblog.gr",
    "likes": 3
  }
  await api
    .put('/api/blogs/65abd6aab205440f800f81b2')
    .send(newBlog)
    .expect(404)
})

test('data update is not successful because id is invalid', async () => {
  const newBlog = {
    "title": "TestBlog",
    "author": "Vlakas Vlakeiou",
    "url": "https://testblog.gr",
    "likes": 3
  }
  await api
    .put('/api/blogs/2432423523')
    .send(newBlog)
    .expect(404)
})

afterAll(async () => {
  await mongoose.connection.close()
})