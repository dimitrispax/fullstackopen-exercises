import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import Error from './components/Error'
import Bloglist from './components/Bloglist'
import BlogCreate from './components/BlogCreate'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser) {
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }



  /* Function that logs in a user in to the application. */
  const loginUser = async (event) => {

    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
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

  /* Function creates a newBlog out a user in to the application. */
  const createBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    try {
      const responseBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(responseBlog))
      setMessage(`Added ${responseBlog.title} by ${responseBlog.author}`)
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
      {user === null
        ? <Login
          LoginUser={loginUser}
          NewUsername={username}
          HandleUsernameChange={handleUsernameChange}
          NewPassword={password}
          HandlePasswordChange={handlePasswordChange}
        />
        :
        <>
          <BlogCreate
            CreateBlog={createBlog}
            Title={title}
            Author={author}
            Url={url}
            HandleTitleChange={handleTitleChange}
            HandleAuthorChange={handleAuthorChange}
            HandleUrlChange={handleUrlChange}
          />
          <Bloglist Blogs={blogs} User={user} LogoutUser={logoutUser} />
        </>
      }

    </div>
  )
}

export default App