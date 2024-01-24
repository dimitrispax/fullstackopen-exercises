const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

// describe('blog endpoint tests', () => {
//   // test('blogs are returned as json', async () => {
//   //   await api
//   //     .get('/api/blogs')
//   //     .expect(200)
//   //     .expect('Content-Type', /application\/json/)
//   // })

//   // test('blogs are 2', async () => {
//   //   const res = await api.get('/api/blogs')
//   //   expect(res.body).toHaveLength(2)
//   // })

//   // test('the unique identifier is id', async () => {
//   //   const res = await api.get('/api/blogs')
//   //   res.body.forEach(blog => {
//   //     expect(blog.id).toBeDefined()
//   //   });
//   // })

//   // test('a valid blog can be added', async () => {
//   //   const newBlog = {
//   //     "title": "CryptoBlog",
//   //     "author": "Mike Nirakis",
//   //     "url": "https://cryptoblog.gr",
//   //     "likes": 21122,
//   //     "id": "6582c874a9daf33954460789"
//   //   }
//   //   await api
//   //     .post('/api/blogs')
//   //     .send(newBlog)
//   //     .expect(201)
//   //     .expect('Content-Type', /application\/json/)

//   //   const res = await api.get('/api/blogs')
//   //   const bloglistTitles = res.body.map(blog => blog.title)

//   //   expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
//   //   expect(bloglistTitles).toContain('CryptoBlog')
//   // })

//   // test('when likes is undefined in request, default at 0', async () => {
//   //   const newBlog = {
//   //     "title": "CryptoBlog",
//   //     "author": "Mike Nirakis",
//   //     "url": "https://cryptoblog.gr",
//   //     "id": "6582c874a9daf33954460789"
//   //   }
//   //   await api
//   //     .post('/api/blogs')
//   //     .send(newBlog)
//   //     .expect(201)
//   //     .expect('Content-Type', /application\/json/)

//   //   const res = await api.get('/api/blogs')
//   //   const likes = res.body.map(blog => blog.likes)
//   //   expect(likes).toContain(0)
//   // })

//   // test('return 400 status when title or url not filled', async () => {
//   //   const newBlog = {
//   //     "title": "CryptoBlog",
//   //     "author": "Mike Nirakis",
//   //     "id": "6582c874a9daf33954460789"
//   //   }
//   //   await api
//   //     .post('/api/blogs')
//   //     .send(newBlog)
//   //     .expect(400)
//   // })

//   // test('data deletion is successful', async () => {
//   //   await api
//   //     .delete('/api/blogs/65abd6aab205440f800f81bb')
//   //     .expect(204)

//   //   const res = await api.get('/api/blogs')
//   //   expect(res.body).toHaveLength(helper.initialBlogs.length - 1)
//   // })

//   // test('data deletion is not successful because blog not found', async () => {
//   //   await api
//   //     .delete('/api/blogs/65abd6aab205440f800f81bc')
//   //     .expect(404)

//   //   const res = await api.get('/api/blogs')
//   //   expect(res.body).toHaveLength(helper.initialBlogs.length)
//   // })

//   // test('data deletion is not successful because id is invalid', async () => {
//   //   await api
//   //     .delete('/api/blogs/325235235')
//   //     .expect(404)

//   //   const res = await api.get('/api/blogs')
//   //   expect(res.body).toHaveLength(helper.initialBlogs.length)
//   // })

//   // test('data update is successful', async () => {

//   //   const newBlog = {
//   //     "title": "TestBlog",
//   //     "author": "Vlakas Vlakeiou",
//   //     "url": "https://testblog.gr",
//   //     "likes": 3
//   //   }
//   //   await api
//   //     .put('/api/blogs/65abd6aab205440f800f81bb')
//   //     .send(newBlog)
//   //     .expect(200)

//   //   const res = await api.get('/api/blogs')
//   //   const updatedBlog = res.body.find(updatedBlog => updatedBlog.title === "TestBlog")
//   //   expect(updatedBlog.likes).toBe(3)
//   // })

//   // test('data update is not successful because blog not found', async () => {

//   //   const newBlog = {
//   //     "title": "TestBlog",
//   //     "author": "Vlakas Vlakeiou",
//   //     "url": "https://testblog.gr",
//   //     "likes": 3
//   //   }
//   //   await api
//   //     .put('/api/blogs/65abd6aab205440f800f81b2')
//   //     .send(newBlog)
//   //     .expect(404)
//   // })

//   // test('data update is not successful because id is invalid', async () => {
//   //   const newBlog = {
//   //     "title": "TestBlog",
//   //     "author": "Vlakas Vlakeiou",
//   //     "url": "https://testblog.gr",
//   //     "likes": 3
//   //   }
//   //   await api
//   //     .put('/api/blogs/2432423523')
//   //     .send(newBlog)
//   //     .expect(404)
//   // })
// })

describe('user endpoint tests', () => {

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('users are 3', async () => {
    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(3)
  })



  test('a valid user can be added', async () => {

    const encryptedPassword = await bcrypt.hash('poluvlakas', 10)

    const newUser = {
      username: 'poluvlakas',
      name: 'Vlakas Vlakeiou',
      password: encryptedPassword,
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/users')
    const userNames = res.body.map(user => user.username)

    expect(res.body).toHaveLength(helper.initialUsers.length + 1)
    expect(userNames).toContain('poluvlakas')
  })

  test('when password is undefined, throw error', async () => {

    const newUser = {
      username: 'poluvlakas',
      name: 'Vlakas Vlakeiou',
      password: "",
    }

    const postResult = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(helper.initialUsers.length)

    expect(postResult.body.error).toContain('username or password must be defined undefined.')

  })

  test('when username is less than 3 characters, throw error', async () => {

    const encryptedPassword = await bcrypt.hash('poluvlakas', 10)

    const newUser = {
      username: 'po',
      name: 'Vlakas Vlakeiou',
      password: encryptedPassword,
    }

    const postResult = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(helper.initialUsers.length)

    expect(postResult.body.error).toContain('username or password must have more than 3 characters length.')

  })

  test('when username is not unique, throw error', async () => {

    const encryptedPassword = await bcrypt.hash('testetes', 10)

    const newUser = {
      "username": "koutras69",
      "name": "Nikolaos Koutrakis",
      password: encryptedPassword,
    }

    const postResult = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(helper.initialUsers.length)

    expect(postResult.body.error).toContain("User validation failed: username: Error, expected `username` to be unique. Value: `koutras69`")

  })


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

  // test('data update is successful', async () => {

  //   const newBlog = {
  //     "title": "TestBlog",
  //     "author": "Vlakas Vlakeiou",
  //     "url": "https://testblog.gr",
  //     "likes": 3
  //   }
  //   await api
  //     .put('/api/blogs/65abd6aab205440f800f81bb')
  //     .send(newBlog)
  //     .expect(200)

  //   const res = await api.get('/api/blogs')
  //   const updatedBlog = res.body.find(updatedBlog => updatedBlog.title === "TestBlog")
  //   expect(updatedBlog.likes).toBe(3)
  // })

  // test('data update is not successful because blog not found', async () => {

  //   const newBlog = {
  //     "title": "TestBlog",
  //     "author": "Vlakas Vlakeiou",
  //     "url": "https://testblog.gr",
  //     "likes": 3
  //   }
  //   await api
  //     .put('/api/blogs/65abd6aab205440f800f81b2')
  //     .send(newBlog)
  //     .expect(404)
  // })

  // test('data update is not successful because id is invalid', async () => {
  //   const newBlog = {
  //     "title": "TestBlog",
  //     "author": "Vlakas Vlakeiou",
  //     "url": "https://testblog.gr",
  //     "likes": 3
  //   }
  //   await api
  //     .put('/api/blogs/2432423523')
  //     .send(newBlog)
  //     .expect(404)
  // })
})
afterAll(async () => {
  await mongoose.connection.close()
})