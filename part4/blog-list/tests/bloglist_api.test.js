const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')


const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are 2', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(2)
})

test('the unique identifier is id', async () => {
  const res = await api.get('/api/blogs')
  res.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
})

test('a valid blog can be added', async () => {
  const newBlog = {
    "title": "CryptoBlog",
    "author": "Mike Nirakis",
    "url": "https://cryptoblog.gr",
    "likes": 21122,
    "id": "6582c874a9daf33954460789"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  const bloglistTitles = res.body.map(blog => blog.title)

  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(bloglistTitles).toContain('CryptoBlog')
})

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

test('return 400 status when title or url not filled', async () => {
  const newBlog = {
    "title": "CryptoBlog",
    "author": "Mike Nirakis",
    "id": "6582c874a9daf33954460789"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})