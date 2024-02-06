import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Error from './components/Error'
import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const toggleVisibility = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  /* Function that logs in a user in to the application. */
  const loginUser = async ({ username, password }) => {

    try {
      const user = await loginService.login({ username, password })
      setUser(user)

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setMessage(`Hello ${user.username}!`)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (err) {
      setErrorMessage("Wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000);
    }
  }

  /* Function that logs out a user in to the application. */
  const logoutUser = (event) => {
    event.preventDefault()
    setMessage(`Bye ${user.username}!`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  /* Function that creates a new blog. */
  const createBlog = async (newBlog) => {

    try {
      let responseBlog = await blogService.create(newBlog)
      responseBlog.user[0] = { username: user.username, name: user.name, id: user.id }
      setBlogs(blogs.concat(responseBlog))
      setMessage(`Added ${responseBlog.title} by ${responseBlog.author}`)
      toggleVisibility.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  /* Function that updates a blog's likes. */
  const updateBlog = async (updatedBlog, id) => {

    try {
      await blogService.update(updatedBlog, id)
      setMessage(`You liked ${updatedBlog.title}, now it has ${updatedBlog.likes}`)
      let updatedBlogs = blogs.map(blog => (JSON.stringify(blog.id) === JSON.stringify(id)) ? { ...blog, likes: updatedBlog.likes } : blog)
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }



  return (
    <div>
      <Notification Message={message} />
      <Error ErrorMessage={errorMessage} />
      {user === null ?
        <LoginForm LoginUser={loginUser} />
        :
        <>
          <h2>Blogs</h2>
          <div style={{ display: 'inline-flex', height: 30, alignItems: 'center' }}>
            <p style={{ marginRight: 5 }}>{user.name} is logged in</p>
            <button onClick={logoutUser}>Log out</button>
          </div>
          <Togglable buttonLabel="New blog" ref={toggleVisibility}>
            <BlogCreationForm CreateBlog={createBlog} />
          </Togglable>
          <Bloglist Blogs={blogs} UpdateBlog={updateBlog} />
        </>
      }
    </div >
  )
}

export default App